import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import ErrorPage from "../error/ErrorPage";
import LandingMainPage from "../landing/core/LandingMainPage";
import SecuredMainPage from "../secured/core/SecuredMainPage";
import SmartAuthService from "../../service/SmartAuthService";
import { mapPatientToUser } from "../../dataaccess/FhirDataAdapter";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fhirClient: {},
      user: null,
      authRequestStarted: false,
      error: null
    };
  }

  render = () => {
    if (this.state.error) {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/error"
              render={(props) => <ErrorPage {...props} error={this.state.error} resetError={this.resetError}/>}/>
            <Redirect to="/error"/>
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
            render={(props) => <LandingMainPage {...props} onLogin={this.handleLoginRequest} user={this.state.user}/>}
          />
          <Route
            path="/secured"
            render={(props) => <SecuredMainPage {...props} onLogout={this.handleLogoutRequest}
              user={this.state.user}/>}
          />
          <Route
            render={(props) => <ErrorPage {...props} error={{
              rootCause: "NOT_FOUND",
              message: "We couldn't find the page you are looking for. Apologies for the inconvenience.",
              resolvable: true
            }}/>}
          />
        </Switch>
      </BrowserRouter>
    );
  };

  componentWillMount = () => {
    SmartAuthService.onSmartAuthenticatedSessionReady()
      .then(fhirClient => this.handleLoginSuccess(fhirClient))
      .catch(errorMessage => this.handleLoginError(errorMessage));
  };

  handleLoginRequest = () => {
    this.setState({ authRequestStarted: true });
    SmartAuthService.startSmartAuthenticatedSession();
  };

  handleLogoutRequest = () => {
    SmartAuthService.endSmartAuthenticatedSession();
    this.setState({ user: null });
  };

  handleLoginSuccess = fhirClient => {
    console.log("Received FHIR client: ", fhirClient);

    this.setState({ fhirClient });
    fhirClient.user.read().then(userResource => {
      console.log("Received user info resource: ", userResource);

      const user = mapPatientToUser(userResource);
      console.log("Mapped to user: ", user);
      this.setState({ user });
    });
  };

  handleLoginError = errorMessage => {
    if (errorMessage === "No 'state' parameter found in authorization response." && !this.state.authRequestStarted) {
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

  resetError = () => this.setState({ error: null });
}

export default App;
