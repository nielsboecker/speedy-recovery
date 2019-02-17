import React, { Component } from "react";


class PatientInfo extends Component {
  
  render() {
    const {user} = this.props;
    console.log("Resources of Patient ",  user);
    return (
      <div>
          <h1>Patient Information For Patient View</h1>
          <h4>Name: {user.name}</h4>
          <h4>Gender: {user.gender}</h4>
          <h4>birthdayDay: {user.birthDate}</h4>
        </div>
    );
  }

  
}

export default PatientInfo ;