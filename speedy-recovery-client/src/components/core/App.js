import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import ErrorPage from "../error/ErrorPage";
import LandingMainPage from "../landing/core/LandingMainPage";
import SecuredMainPage from "../secured/core/SecuredMainPage";
import SmartAuthService from "../../service/SmartAuthService";
import FhirServerService from "../../service/FhirServerService";
import { filterPatientResource } from "../../service/FhirDataFilteringService";
import { fhirMapAppointment, fhirMapPatient } from "../../service/FhirDataMappingService";
import FhirDataQueryingService from "../../service/FhirDataQueryingService";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fhirClient: {},
      user: null,
      patient: {},
      appointments: [],
      authRequestStarted: false,
      error: null,
      fhirVersion: null
    };
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
                appointments = {this.state.appointments}
                fhirVersion={this.state.fhirVersion}
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
      .then(fhirClient => this.handleLoginSuccess(fhirClient))
      .catch(errorMessage => this.handleLoginError(errorMessage));
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
    this.setState({ fhirClient });
    console.log("Received FHIR client: ", fhirClient);

    fhirClient.user
      .read()
      .then(currentUserResource => {
        console.log("Received current user resources: ", currentUserResource);

          var user = this.updateStateUser(currentUserResource);
          if (user.role === "Practitioner") {
          // also get patient info
          fhirClient.patient
            .read()
            .then(patientResource => {
              console.log("Patient Resource for practitioner: ", patientResource);
                this.updateStatePatient(patientResource);
            })
            .catch(err => {
              console.log("The error is  ", err);
            });
        }
        // else if(userType === "Parent"){
        //      user.role = "Parent";
        //      TODO
        // }
        this.updateStateAppointment(user.id);

        this.setState({ user });
      })
      .catch(error => console.error(error));
  };

  updateStateAppointment (userId) {
    FhirDataQueryingService.getUserAppointment(userId)
      .then(appointmentResource => {
        const appointments = appointmentResource.data.entry.map((app) => (fhirMapAppointment(app.resource, this.state.fhirVersion)));
        console.log("Appointments Resource after mapping: ", appointments);
        this.setState({appointments});})
      .catch(errorMessage=>{console.log("The error is  ", errorMessage)});
  };

  updateStatePatient(patientResource) {
        const filteredPatientResource = filterPatientResource(patientResource);
        if (filteredPatientResource) {
            const patient = fhirMapPatient(filteredPatientResource, this.state.fhirVersion);
            console.log("Patient Resource after mapping: ", patient);
            this.setState({patient});
        } else {
            console.log("Crucial information missing from resource: ", patientResource);
        }
  }

  updateStateUser(currentUserResource) {
        var user = undefined;
        const filteredPatient = filterPatientResource(currentUserResource);
        if (filteredPatient) {
            user = fhirMapPatient(filteredPatient, this.state.fhirVersion);
            console.log("User Resource after mapping: ", user);
        } else {
            console.log("Crucial information missing from resource: ", filteredPatient);
        }
        return user;
  }


  handleLoginError = errorMessage => {
    if (
      errorMessage ===
        "No 'state' parameter found in authorization response." &&
      !this.state.authRequestStarted
    ) {
      // SMART JS library will always try to login based on last stored token, which leads to this error at initial page load
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

  resetError = () => this.setState({ error: null });
}

export default App;
