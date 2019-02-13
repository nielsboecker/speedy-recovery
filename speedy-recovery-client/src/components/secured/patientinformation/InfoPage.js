import React, { Component } from "react";

class PatientInfoPage extends Component {
  
  render() {
    return (
      <div>
        <h1>{this.props.user.name}</h1>
        <h1>{this.props.user.role}</h1>
        

      </div>
    );
  }

  
}




export default PatientInfoPage;
