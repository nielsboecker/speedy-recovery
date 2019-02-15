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
      patResource:{},
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
    
    fhirClient.user.read()
      .then(currentUserResource => {
        console.log("Received currentUser info resource: ", currentUserResource);
        const userType = currentUserResource.resourceType
        console.log("Received currentUser info resourceType: ", userType);
        const user = mapPatientToUser(currentUserResource);
        if(userType === "Practitioner"){
          // also get patient info
          fhirClient.patient.read()
            .then(patientResource => {
              console.log("patientResource for dr: ", patientResource);
              // so this is patient mapped resources that we need for practitioner
              const patResource = mapPatientToUser(patientResource);
              console.log("patientResource after mapping: ", patResource);
              this.setState({ patResource });
            }).catch(err=>{
              console.log("The error is  ", err  );
            });
        }
        // else if(userType === "Parent"){
        //      user.role = "Parent";
        //      TODO
        // }
        this.setState({ user });
        
      }).catch(err=>{
        console.log("The error is  ", err  );
      });
    }   
  }

     


export default App;
