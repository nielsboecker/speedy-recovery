import React, { Component } from "react";


class PatientInfo extends Component {
  
  render() {
    const userResources = this.props.user;
    console.log("Mapped Resources from PatientInfo ",  userResources);
    return (
      <div>
          <h1>PATIENT INFORMATION FOR PATIENT VIEW</h1>
          <h4>Name: {userResources.name}</h4>
          <h4>Gender: {userResources.gender}</h4>
          <h4>Birthdate: {userResources.birthDate}</h4>
  
      
        </div>
    );
  }

  
}




export default PatientInfo ;