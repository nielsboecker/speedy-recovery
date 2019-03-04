import React, { Component } from "react";
import HomePageForPatient from "../home/HomePageForPatient";
import HomePageForParent from "../home/HomePageForParent";
import HomePageForPractitioner from "../home/HomePageForPractitioner";

class HomePageFactory extends Component {
  render() {
    const { user, patient, events } = this.props;

    switch (user.role) {
      case "Patient":
        return (
          <HomePageForPatient
            user={user}
            event={
              events
                .filter(
                  event =>
                    new Date(event.start) - new Date("2019", "01", "8") > 0
                )
                .sort(function(a, b) {
                  return new Date(a.start) - new Date(b.start);
                })[0]
            }
          />
        );
      case "Parent":
        return (
          <HomePageForParent
            user={user}
            event={
              events
                .filter(
                  event =>
                    new Date(event.start) - new Date("2019", "01", "8") > 0
                )
                .sort(function(a, b) {
                  return new Date(a.start) - new Date(b.start);
                })[0]
            }
            patient={patient}
          />
        );
      case "Practitioner":
        return (
          <HomePageForPractitioner
            user={user}
            event={
              events
                .filter(
                  event =>
                    new Date(event.start) - new Date("2019", "01", "8") > 0
                )
                .sort(function(a, b) {
                  return new Date(a.start) - new Date(b.start);
                })[0]
            }
          />
        );
      default:
        return undefined;
    }
  }
}

export default HomePageFactory;

