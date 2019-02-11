import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import ErrorPage from "./ErrorPage";
import LandingMainPage from "../landing/core/LandingMainPage";
import SecuredMainPage from "../secured/core/SecuredMainPage";
import SmartAuthService from "../../service/SmartAuthService";
import { mapPatientToUser } from "../../dataaccess/FhirDataAdapter";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fhirClient: {},
      user: null
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
              render={(props) => <LandingMainPage {...props} onLogin={this.handleLogin} user={this.state.user}/>}
            />
            <Route
              path="/secured"
              render={(props) => <SecuredMainPage {...props} onLogout={this.handleLogout} user={this.state.user}/>}
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

  handleLogin = () => {
    SmartAuthService.startSmartAuthenticatedSession();
  };

  handleLogout = () => {
    SmartAuthService.endSmartAuthenticatedSession();
    this.setState({ user: null });
  };

  onAuthStatusChanged = (fhirClient) => {
    console.log("Received FHIR client: ", fhirClient);

    this.setState({ fhirClient });
    fhirClient.user.read().then(userResource => {
      console.log("Received user info resource: ", userResource);

      const user = mapPatientToUser(userResource);
      console.log("Mapped to user: ", user);
      this.setState({ user });
    });
  };
}

export default App;
