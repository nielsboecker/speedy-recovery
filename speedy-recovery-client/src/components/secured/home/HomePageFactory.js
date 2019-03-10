import React, { Component } from "react";
import HomePageForPatient from "../home/HomePageForPatient";
import HomePageForParent from "../home/HomePageForParent";
import HomePageForPractitioner from "../home/HomePageForPractitioner";

class HomePageFactory extends Component {
  render() {
    const { user, events } = this.props;

    switch (user.role.toLowerCase()) {
      case "patient":
        return <HomePageForPatient user={user} events={events} />;
      case "parent":
        return <HomePageForParent user={user} events={events} />;
      case "practitioner":
        return <HomePageForPractitioner user={user} events={events} />;
      default:
        console.error(`HomePage for user role ${user.role} is invalid`);
        return null;
    }
  }
}

export default HomePageFactory;
