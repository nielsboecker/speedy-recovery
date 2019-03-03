import React, { Component } from "react";
import HomePageForPatient from "../home/HomePageForPatient";
import HomePageForParent from "../home/HomePageForParent";
import HomePageForPractitioner from "../home/HomePageForPractitioner";

class HomePageFactory extends Component {
  render() {
    const { user, patient, events, match } = this.props;

    switch (user.role) {
      case "Patient":
        return (
          <HomePageForPatient
            user={user}
            events={
              events
                .filter(
                  event =>
                    new Date(event.start) - new Date("2019", "01", "8") > 0
                )
                .sort(function(a, b) {
                  return new Date(a.start) - new Date(b.start);
                })[0]
            }
            match={match}
          />
        );
      case "Parent":
        return (
          <HomePageForParent
            user={user}
            events={
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
            match={match}
          />
        );
      case "Practitioner":
        return (
          <HomePageForPractitioner
            user={user}
            events={
              events
                .filter(
                  event =>
                    new Date(event.start) - new Date("2019", "01", "8") > 0
                )
                .sort(function(a, b) {
                  return new Date(a.start) - new Date(b.start);
                })[0]
            }
            match={match}
            patient={patient}
          />
        );
      default:
        return undefined;
    }
  }
}

export default HomePageFactory;

{
  /*events={(events.filter(event => new Date(event.start)-new Date()>0)).sort(function(a,b){return  new Date(b.date) - new Date(a.date)[0];})} */
}
