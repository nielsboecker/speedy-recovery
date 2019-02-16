import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import ErrorPage from "./ErrorPage";
import LandingMainPage from "../landing/core/LandingMainPage";
import SecuredMainPage from "../secured/core/SecuredMainPage";
import SmartAuthService from "../../service/SmartAuthService";
import { mapPatientToUser} from "../../dataaccess/FhirDataAdapter";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fhirClient: {},
      user: null,
      patient:{},
    };
  }

  render = () => {
    
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <LandingMainPage {...props} onLogin={this.handleLogin} user={this.state.user} />}
            />
            <Route
              path="/secured"
              render={(props) => <SecuredMainPage {...props} onLogout={this.handleLogout} user={this.state.user}
                                                  patient={this.state.patient}/>}
            />
            <Route component={ErrorPage}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  };
  
  componentWillMount = () => {
    SmartAuthService.onSmartAuthenticatedSessionReady(fhirClient => this.onAuthStatusChanged(fhirClient));
  };

  handleLogin = (user) => {
    SmartAuthService.startSmartAuthenticatedSession(user);
  };

  handleLogout = () => {
    SmartAuthService.endSmartAuthenticatedSession();
    this.setState({ user: null });
  };

  onAuthStatusChanged = (fhirClient) => {
    this.setState({ fhirClient });
    console.log("Received FHIR client: ", fhirClient);
    
    fhirClient.user.read()
      .then(currentUserResource => {
        console.log("Received current user resources: ", currentUserResource);
        const user = mapPatientToUser(currentUserResource);
        console.log("Mapped user ResourceType: ", user.role);
        if(user.role === "Practitioner"){
          // also get patient info
          fhirClient.patient.read()
            .then(patientResource => {
              console.log("Patient Resource for practitioner: ", patientResource);
              // so this is patient mapped resources that we need for practitioner
              const patient = mapPatientToUser(patientResource);
              console.log("Patient Resource after mapping: ", patient);
              this.setState({patient});
            }).catch(err=>{
              console.log("The error is  ", err);
            });
        }
        // else if(userType === "Parent"){
        //      user.role = "Parent";
        //      TODO
        // }
      
        if (fhirClient.userId === 'Patient/f0462936-eb4b-4da1-b45a-fbd96ebf8ccb') {
          user.role = 'Parent';
        }

        this.setState({user});
        
      }).catch(err=>{
        console.log("The error is  ", err);
      });
    }   
  }

export default App;