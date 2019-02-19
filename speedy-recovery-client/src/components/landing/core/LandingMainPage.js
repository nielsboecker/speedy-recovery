import React, { Component } from "react";
import StartPage from "../start/StartPage";
import { Redirect } from "react-router-dom";

class LandingMainPage extends Component {
  render() {
    if (this.props.user) {
      return <Redirect to="/secured"/>;
    }

    return <StartPage onLogin={this.props.onLogin}/>;
  }
}

export default LandingMainPage;
