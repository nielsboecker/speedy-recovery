import React, { Component,Fragment } from "react";
import HomePageForPatient from "../home/HomePageForPatient";
import HomePageForParent from "../home/HomePageForParent";
import HomePageForPractitioner from "../home/HomePageForPractitioner";



class HomePageFactory extends Component {
  render() {
    const { user, patient, events } = this.props;
    const event=events.filter(event => new Date(event.start)-new Date()>0)
                      .sort((a,b) => new Date(a.start)-new Date(b.start))[0];
    const homePage=user.role.toString()+"HomePage";

    switch (homePage) {
      case "PatientHomePage":
        return (
          <HomePageForPatient
            user={user}
            event={event}
          />
        );
      case "ParentHomePage":
        return (
          <HomePageForParent
            user={user}
            event={event}
            patient={patient}
          />
        );
      case "PractitionerHomePage":
        return (
          <HomePageForPractitioner
            user={user}
            event={event}
          />
        );
      default:
        console.error("Enter the wrong page")
        return null;
    }
  }
}

export default HomePageFactory;
