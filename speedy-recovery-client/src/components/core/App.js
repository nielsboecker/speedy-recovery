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
      fhirClient: {}, //empty object literal
      user: null,
      patResource:{}
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
              render={(props) => <SecuredMainPage {...props} onLogout={this.handleLogout} user={this.state.user} patResource={this.state.patResource}/>}
            />
            <Route component={ErrorPage}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  };
  // called before component is inserted into dom
  componentWillMount = () => {
    SmartAuthService.onSmartAuthenticatedSessionReady(fhirClient => this.onAuthStatusChanged(fhirClient));
  };

  handleLogin = () => {
    SmartAuthService.startSmartAuthenticatedSession();
  };

  handleLogout = () => {
    SmartAuthService.endSmartAuthenticatedSession();
    this.setState({ user: null });
  };

  onAuthStatusChanged = (fhirClient) => {
    this.setState({ fhirClient });
      
    console.log("Received FHIR client: ", fhirClient);
    const currentUserId = fhirClient.userId;
    console.log("FHIR client currentUserID: ", currentUserId);
    const userType = (currentUserId.split("/"))[0];
    console.log("Type of user: ", userType);
    
    if(userType === "Practitioner" ){
     
      // get the resources for the currentUser which is a practitioner
      fhirClient.user.read().then(currentUserResource => {
        console.log("Received currentUser info resource: ", currentUserResource);
        const user = mapPatientToUser(currentUserResource);
        console.log("Mapped resources of Currentuser: ", user);
        // so this is practitioner mapped resources
        this.setState({ user });
      });
      
      // the practitioner also needs to see the patient resource
      fhirClient.patient.read().then(patientResource => {
        console.log("patientResource for dr: ", patientResource);
        const resourceOfP = patientResource;
        const patResource = mapPatientToUser(resourceOfP);
        console.log("patientResource after mapping: ", patResource);
        // so this is patient mapped resources that we need for practitioner
        this.setState({ patResource });
        });
  
    }
    else{
      fhirClient.user.read().then(currentUserResource => {
        console.log("Received currentUser info resource: ", currentUserResource);
        const user = mapPatientToUser(currentUserResource);
        console.log("Mapped resources of Currentuser: ", user);
        // so this is patients mapped resources
        this.setState({ user });
      });
    }
  
  };
}

export default App;
