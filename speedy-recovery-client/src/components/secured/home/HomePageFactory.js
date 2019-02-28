import React, { Component } from "react";
import HomePageForPatient from "../home/HomePageForPatient";
import HomePageForParent from "../home/HomePageForParent";
import HomePageForPractitioner from "../home/HomePageForPractitioner";

class HomePageFactory extends Component {
  render() {
    const { user, patient, event } = this.props;

    switch (user.role) {
      case "Patient":
        return <HomePageForPatient user={user} event={event} />;
      case "Parent":
        return <HomePageForParent user={user} event={event} />;
      case "Practitioner":
        return <HomePageForPractitioner user={user} patient={patient} event={event} />;
      default:
        return undefined;
    }
  }
}

export default HomePageFactory;