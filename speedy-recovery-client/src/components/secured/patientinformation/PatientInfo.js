import React, { Component } from "react";

class PatientInfo extends Component {
  render() {
    const { user } = this.props;
    //let birthday = user.birthDate;
    //console.log(birthday);
    // const bDate = birthday.getDate();
    // const bMonth = birthday.getMonth() + 1; // january starts from 0
    // const bYear = birthday.getFullYear();
    // birthday = bDate + '/' + bMonth + '/' + bYear;

    return (
      <div>
        <h1>Patient Information For Patient View</h1>
        <h4>Name: {user.name}</h4>
        <h4>Gender: {user.gender}</h4>
        
      </div>
    );
  }
}

export default PatientInfo;
