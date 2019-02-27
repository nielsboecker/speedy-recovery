import React, { Component } from "react";

class PatientInfo extends Component {
  render() {
    const { user } = this.props;
    let birthday = new Date(user.birthDate);
    const bMonth = birthday.getMonth() + 1; // january starts from 0
    birthday = birthday.getDate() + "/" + bMonth + "/" + birthday.getFullYear();

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
