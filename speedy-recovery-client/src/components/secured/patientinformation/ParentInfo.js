import React, { Component } from "react";

class ParentInfo extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        <h1>Patient Information For Parent View</h1>
        <h4>Name: {user.name}</h4>
        <h4>Gender: {user.gender}</h4>
        <h4>Address: {user.address}</h4>
      </div>
    );
  }
}

export default ParentInfo;
