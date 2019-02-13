import React, { Component } from "react";


class ParentInfo extends Component {
  
  render() {
    const userResources = this.props.user;
    console.log("Mapped Resources from PatientInfo ",  userResources);
    return (
      <div>
          <h1>PATIENT INFORMATION FOR PARENT VIEW</h1>
          <h4>Name: {userResources.name}</h4>
          <h4>Gender: {userResources.gender}</h4>
          <h4>Birthdate: {userResources.birthDate}</h4>
  
      
        </div>
    );
  }

  
}




export default ParentInfo ;