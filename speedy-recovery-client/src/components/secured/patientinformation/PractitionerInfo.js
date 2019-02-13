import React, { Component } from "react";

class PractitionerInfo extends Component {
  render() {
    const userResources = this.props.user;
    const patResource = this.props.extraInfo;
    console.log("Extra Resources from PractionerInfo ",  patResource);
    console.log("Mapped Resources from PractionerInfo ",  userResources);
    return (
      <div>
        <h1>PATIENT INFORMATION FOR PRACTITIONER VIEW</h1>
        <h4>Name: {patResource.name}</h4>
        <h4>Gender: {patResource.gender}</h4>
        <h4>Birthdate: {patResource.birthDate}</h4>
      </div>
    );
  }

  
}




export default PractitionerInfo;
