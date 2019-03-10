import React, { Component } from "react";
import PatientHomePage from "./PatientHomePage";
import ParentHomePage from "./ParentHomePage";
import PractitionerHomePage from "./PractitionerHomePage";

class HomePageFactory extends Component {
  render() {
    const { user, events } = this.props;

    switch (user.role.toLowerCase()) {
      case "patient":
        return <PatientHomePage user={user} events={events}/>;
      case "parent":
        return <ParentHomePage user={user} events={events}/>;
      case "practitioner":
        return <PractitionerHomePage user={user} events={events}/>;
      default:
        console.error(`HomePage for user role ${user.role} is invalid`);
        return null;
    }
  }
}

export default HomePageFactory;
