import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import ErrorPage from "../error/ErrorPage";
import LandingMainPage from "../landing/core/LandingMainPage";
import SecuredMainPage from "../secured/core/SecuredMainPage";
import SmartAuthService from "../../service/SmartAuthService";
import FhirServerService from "../../service/FhirServerService";
import {
  fhirMapAppointment,
  fhirMapCarePlan,
  fhirMapCondition,
  fhirMapMedicationDispense,
  fhirMapPatient,
  fhirMapPractitioner,
  getChildID
} from "../../service/FhirDataMappingService";
import FhirDataQueryingService from "../../service/FhirDataQueryingService";
import { filterPatientResource, filterPractitionerResource } from "../../service/FhirDataFilteringService";

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          fhirClient: {},
          user: null,
          patient: {},
          appointments: [],
          conditions: [],
          medicationDispenses: [],
          carePlans: [],
          authRequestStarted: false,
          error: null,
          fhirVersion: null,
          patientPractitioners: [],
          userList:[],
          childID: null
      }
  }

  render = () => {
    if (this.state.error) {
      return (
        <BrowserRouter>
          <Switch>
            <Route
              path="/error"
              render={props => (
                <ErrorPage
                  {...props}
                  error={this.state.error}
                  resetError={this.resetError}
                />
              )}
            />
            <Redirect to="/error" />
          </Switch>
        </BrowserRouter>
      );
    }

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <LandingMainPage
                {...props}
                onLogin={this.handleLoginRequest}
                user={this.state.user}
              />
            )}
          />
          <Route
            path="/secured"
            render={props => (
              <SecuredMainPage
                {...props}
                onLogout={this.handleLogoutRequest}
                user={this.state.user}
                patient={this.state.patient}
                appointments={this.state.appointments}
                conditions={this.state.conditions}
                medicationDispenses={this.state.medicationDispenses}
                carePlans={this.state.carePlans}
                patientPractitioners={this.state.patientPractitioners}
                userList={this.state.userList}
                fhirVersion={this.state.fhirVersion}
                childID={this.state.childID}
              />
            )}
          />
          <Route
            render={props => (
              <ErrorPage
                {...props}
                error={{
                  rootCause: "NOT_FOUND",
                  message:
                    "We couldn't find the page you are looking for. Apologies for the inconvenience.",
                  resolvable: true
                }}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  };

  componentWillMount = () => {
    // Check FHIR server capability
    FhirServerService.checkFhirCapabilityStatement()
      .then(result => {
        console.log("FHIR capability check successful", result);
        this.setState({ fhirVersion: result.fhirVersion });
      })
      .catch(() => this.handleFhirServerError());

    // Register SMART auth callback
    SmartAuthService.onSmartAuthenticatedSessionReady()
      .then(fhirClient => this.setState({ fhirClient }))
      .catch(errorMessage => this.handleLoginError(errorMessage));
  };


  componentDidUpdate = (prevProps, prevState) => {

    console.log("prevState.fhirClient = " + prevState.fhirClient);
    console.log("this.state.fhirClient = " + this.state.fhirClient);
    console.log("prevState.fhirVersion = " + prevState.fhirVersion);
    console.log("this.state.fhirVersion", this.state.fhirVersion);

    if (prevState.fhirClient !== this.state.fhirClient && prevState.fhirVersion !== this.state.fhirVersion) {
          this.handleLoginSuccess(this.state.fhirClient);
      }
  };

  handleLoginRequest = user => {
    this.setState({ authRequestStarted: true });
    SmartAuthService.startSmartAuthenticatedSession(user);
  };

  handleLogoutRequest = () => {
    SmartAuthService.endSmartAuthenticatedSession();
    this.setState({ user: null });
  };

  handleLoginSuccess = fhirClient => {
    console.log("Received FHIR client: ", fhirClient);

    fhirClient.user
      .read()
      .then(currentUserResource => {
        console.log("Received current user resources: ", currentUserResource);
        console.log("Current user id: ", currentUserResource.id);

        const user = this.updateStateUser(currentUserResource);

        switch (user.role) {
          case "Parent":
            this.updateStatechildID(currentUserResource);
            this.updateStateAppointment(this.state.childID, user.role);
            break;
          case "Practitioner":
            this.updateStateAppointment(user.id, user.role);
            break;
          case "Patient":
            this.updateStateAppointment(user.id, user.role);
            break;
          default:
            console.log("Invalid user role: ", user.role);
        }

        if (user.role === "Practitioner") {
          // also get patient info
          fhirClient.patient
            .read()
            .then(patientResource => {
              console.log(
                "Patient Resource for practitioner: ",
                patientResource
              );
              this.updateStatePatient(patientResource);
            })
            .catch(error => {
              console.error(error);
            });
        }
        this.updateStateAppointment(user.id);
        this.updateStateCondition(user.id);
        this.updateStateMedicationDispense(user.id);
        this.updateStateCarePlan(user.id);

        this.setState({ user });
      })
      .catch(error => console.error(error));
  };

  updateStateAppointment(userId, role) {
    FhirDataQueryingService.getUserAppointments(userId)
      .then(appointmentResource => {
        const appointments = appointmentResource.map(appointment =>
          fhirMapAppointment(appointment, this.state.fhirVersion)
        );
        const practitioners = this.removeArrayDuplicates(
          appointments.map(appointment => ({
            name: appointment.practitioner,
            id: appointment.practitionerId
          }))
        );

          practitioners.map(practitioner => {
              const family = practitioner.name.split(' ');
              const id = practitioner.id;
              return this.updateStatePractitioner(id, family[family.length - 1]);
          });

        this.setState({ appointments });
        const userList = this.setUserList(appointments, role);
        this.setState({ appointments, userList });
      })
      .catch(error => {
        console.error(error);
      });
  }

  setUserList(resource, role) {
    if (resource && role) {
      return role === "Practitioner"
        ? this.removeArrayDuplicates(
            resource.map(appointment => ({
              name: appointment.patient,
              id: appointment.patientId
            }))
          )
        : this.removeArrayDuplicates(
            resource.map(appointment => ({
              name: appointment.practitioner,
              id: appointment.practitionerId
            }))
          );
    }
    return [];
  }

  updateStateCondition(userId) {
    FhirDataQueryingService.getUserConditions(userId)
      .then(conditionResource => {
        const conditions = conditionResource.map(condition =>
          fhirMapCondition(condition, this.state.fhirVersion)
        );
        this.setState({ conditions });
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateStateMedicationDispense(userId) {
    FhirDataQueryingService.getUserMedicationDispense(userId)
      .then(medicationResource => {
        const medicationDispenses = medicationResource.map(medication =>
          fhirMapMedicationDispense(medication, this.state.fhirVersion)
        );
        this.setState({ medicationDispenses });
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateStateCarePlan(userId) {
      FhirDataQueryingService.getUserCarePlan(userId)
          .then(carePlanResource => {
              const carePlans = carePlanResource.map(carePlan =>
                  fhirMapCarePlan(carePlan, this.state.fhirVersion)
              );
              this.setState({carePlans});
          })
          .catch(error => {
              console.error(error);
          });
  }

  updateStatePatient(patientResource)
      {
          const filteredPatientResource = filterPatientResource(patientResource);
          if (filteredPatientResource) {
              const patient = fhirMapPatient(
                  filteredPatientResource,
                  this.state.fhirVersion
              );
              console.log("Patient Resource after mapping: ", patient);
              this.setState({patient});
          } else {
              console.error(
                  "Crucial information missing from resource: ",
                  patientResource
              );
          }
      }

      updateStateUser(currentUserResource)
      {
          var user = undefined;
          const filteredPatient = filterPatientResource(currentUserResource);
          if (filteredPatient) {
              user = fhirMapPatient(filteredPatient, this.state.fhirVersion);
              console.log("User Resource after mapping: ", user);
          } else {
              console.error(
                  "Crucial information missing from resource: ",
                  filteredPatient
              );
          }
          return user;
      }

      updateStatePractitioner = (practId, familyName) =>
          FhirDataQueryingService.getPractitioner(practId, familyName)
              .then(practitionerResource => {
                  const filteredPractitionerResource = filterPractitionerResource(practitionerResource.resource);
                  if (filteredPractitionerResource) {

                      const practitioner = fhirMapPractitioner(
                          filteredPractitionerResource,
                          this.state.fhirVersion
                      );

                      this.state.patientPractitioners.push(practitioner);
                  } else {
                      console.error(
                          "Crucial information missing from resource: ",
                          practitionerResource
                      );
                  }
              })
              .catch(error => {
                  console.error(error);
              });

      updateStatechildID(currentUserResource)
      {
          const childID = getChildID(currentUserResource, this.state.fhirVersion);
          console.log("CHILDID", childID);
          this.setState({childID});
      }

      handleLoginError = errorMessage => {
          if (
              errorMessage ===
              "No 'state' parameter found in authorization response." &&
              !this.state.authRequestStarted
          ) {
              // SMART JS library will always try to login based on last stored token, which leads to this error at
              // initial page load
              console.info("Ignoring initial SMART auth error");
              return;
          }

          this.setState({
              error: {
                  rootCause: "SMART_AUTH",
                  message: errorMessage,
                  resolvable: true
              }
          });
      };

      handleFhirServerError = () => {
          this.setState({
              error: {
                  rootCause: "FHIR_SERVER",
                  message:
                      "The EHR's FHIR server does not provide the required functionality.",
                  resolvable: false
              }
          });
      };

      resetError = () => this.setState({error: null});

  removeArrayDuplicates = array => {
    return array
      ? array.reduce(
          (prev, curr) =>
            prev.find(a => a["id"] === curr["id"])
              ? prev
              : prev.push(curr) && prev,
          []
        )
      : array;
  };
}

export default App;
