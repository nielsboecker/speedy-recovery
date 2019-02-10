import React, { Component } from "react";
import StartPage from "../start/StartPage";

class LandingMainPage extends Component {
  render() {
    return <StartPage onLogin={this.props.onLogin}/>;
  }

  componentDidMount() {
    // TODO: If user already authenticated, redirect to SecureMainPage
  }
}

export default LandingMainPage;
