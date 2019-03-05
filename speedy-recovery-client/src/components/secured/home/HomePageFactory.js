import React, { Component } from "react";
import HomePageForPatient from "../home/HomePageForPatient";
import HomePageForParent from "../home/HomePageForParent";
import HomePageForPractitioner from "../home/HomePageForPractitioner";

class HomePageFactory extends Component {
  render() {
    const { user, events } = this.props;
    const event = events
      .filter(event => new Date(event.start) - new Date() > 0)
      .sort((a, b) => new Date(a.start) - new Date(b.start))[0];
    const homePage = user.role.toString() + "HomePage";

    switch (homePage) {
      case "PatientHomePage":
        return <HomePageForPatient user={user}
                                   events={events} />;
      case "ParentHomePage":
        return (
          <HomePageForParent user={user}
                             events={events}
                             />
        );
      case "PractitionerHomePage":
        return <HomePageForPractitioner user={user}
                                        events={events}
                                        />;
      default:
        console.error("Enter the wrong page");
        return null;
    }
  }


}

export default HomePageFactory;
