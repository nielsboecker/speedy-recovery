import React, { Component } from "react";

class PractitionerInfo extends Component {
  render() {
    const { patient } = this.props;

    return (
      <div>
        <h1>Patient Information For Practitioner View</h1>
        <h4>Name: {patient.name}</h4>
        <h4>Gender: {patient.gender}</h4>
        <h4>Address: {patient.address}</h4>
        <h4>Email: {patient.email}</h4>
      </div>
    );
  }


}

export default PractitionerInfo;
