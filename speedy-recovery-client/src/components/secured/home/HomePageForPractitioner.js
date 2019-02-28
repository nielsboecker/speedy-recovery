import React, { Component } from "react";

class HomePageForPractitioner extends Component {
  render() {
    const { user , patient } = this.props;

    return (
      <div>
        <h1>Hello</h1>
        <h4>Welcome {user.name}</h4>
        <h4>This is practitioner's Homepage</h4>
      </div>
    );
  }
}

export default HomePageForPractitioner;