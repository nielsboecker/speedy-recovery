import React, { Component } from "react";
import { Icon, Tab } from "semantic-ui-react";
import "./PractitionerInfo.css";

class PractitionerBasicPane extends Component {
  render() {
    const { user } = this.props;

    const showGenderText = () => {
      let genderStr = "";
      const gender = user.gender;
      if (gender === "female") {
        genderStr = "Girl";
      } else if (gender === "male") {
        genderStr = "Boy";
      } else {
        genderStr = gender;
      }
      return genderStr;
    };

    const showGenderIcon = () => {
      let genderIcon = <Icon fitted name="smile outline" />;
      const gender = user.gender;
      if (gender === "female") {
        genderIcon = <Icon color="pink" fitted name="woman" />;
      } else if (gender === "male") {
        genderIcon = <Icon color="blue" fitted name="man" />;
      }
      return genderIcon;
    };

    return (
      <div>
        <Tab.Pane>
          <h4>Name: {user.name}</h4>
          <h4>
            Gender: {showGenderText()}
            {showGenderIcon()}
          </h4>
          <h4>
            Birthday: {user.birthDate} <Icon fitted name="birthday" />
          </h4>
          <h4>
            Phone: {user.phone}
            <Icon fitted name="phone" />
          </h4>
          <h4>
            email: {user.email}
            <Icon fitted name="email" />
          </h4>
          <h4>
            Address: {user.address}
            <Icon fitted name="home" />
          </h4>
        </Tab.Pane>
      </div>
    );
  }
}

export default PractitionerBasicPane;
