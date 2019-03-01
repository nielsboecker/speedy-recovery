import React, { Component } from "react";
import HomePageForPatient from "../home/HomePageForPatient";
import HomePageForParent from "../home/HomePageForParent";
import HomePageForPractitioner from "../home/HomePageForPractitioner";

class HomePageFactory extends Component {
  render() {
    const { user, patient, events } = this.props;

    switch (user.role) {
      case "Patient":
        return <HomePageForPatient user={user} events={events.find(result=>result.id=="219850")} />;
      case "Parent":
        return <HomePageForParent user={user} events={events} />;
      case "Practitioner":
        return <HomePageForPractitioner user={user} patient={patient} events={events} />;
      default:
        return undefined;
    }
  }
}

export default HomePageFactory;