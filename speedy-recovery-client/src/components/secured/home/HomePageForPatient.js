import React, { Component } from "react";

class HomePageForPatient extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        <h1>Hello</h1>
        <h4>Welcome {user.name}</h4>
        <h4>This is patient's Homepage</h4>
      </div>
    );
  }
}

export default HomePageForPatient;