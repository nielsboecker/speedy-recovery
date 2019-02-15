import React, { Component } from "react";


class ParentInfo extends Component {
  
  render() {
    const userResources = this.props.user;
    console.log("Mapped Resources from ParentInfo ",  userResources);
    return (
      <div>
          <h1>PATIENT INFORMATION FOR PARENT VIEW</h1>
          <h4>Name: {userResources.name}</h4>
          <h4>Gender: {userResources.gender}</h4>
          <h4>Address: {userResources.address}</h4>
      </div>
    );
  }

  
}




export default ParentInfo ;