import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import ErrorPage from "./ErrorPage";
import LandingMainPage from "../landing/core/LandingMainPage";
import SecuredMainPage from "../secured/core/SecuredMainPage";
import SmartAuthService from "../../service/SmartAuthService";
import { mapPatientToUser } from "../../dataaccess/FhirDataAdapter";
import fhirExamplePatient from "../../__tests__/test_input/fhir_r3/FhirExamplePatient";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      user: mapPatientToUser(fhirExamplePatient)
    };
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LandingMainPage} onLogin={this.handleLogin}/>
            <Route
              path="/secured"
              render={(props) => <SecuredMainPage {...props} onLogout={this.handleLogout} user={this.state.user}/>}
            />
            <Route component={ErrorPage}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
