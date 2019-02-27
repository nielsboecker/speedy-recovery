import React, { Component } from "react";

class PatientInfo extends Component {
  render() {
    const { user } = this.props;
    const birthday = new Date(user.birthDate).toLocaleDateString("en-uk");

    return (
      <div>
        <h1>Patient Information For Patient View</h1>
        <h4>Name: {user.name}</h4>
        <h4>Gender: {user.gender}</h4>
        <h4>Birthday: {birthday}</h4>
      </div>
    );
  }
}

export default PatientInfo;
