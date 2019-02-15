import React, { Component } from "react";

class PractitionerInfo extends Component {
  render() {
    const {user, patient} = this.props;
    console.log("Resources of Practitioner ",  user);
    console.log("Patient Resources for Practioner ",  patient);
    
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
