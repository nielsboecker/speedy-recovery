import React, { Component } from "react";
import { Icon, Menu, Tab } from "semantic-ui-react";
import "./PatientInfo.css";
import PatientConditionPane from "./PatientConditionPane";
import PatientCarePlanPane from "./PatientCarePlanPane";
import PatientMedicationDispensePane from "./PatientMedicationDispensePane";

class PatientInfo extends Component {
  render() {
    const { user, conditions, medicationDispenses, carePlans } = this.props;

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

    const panes = [
      {
        menuItem: (
          <Menu.Item key={"basic"}>
            <Icon fitted name="id card outline" />
            Basic
          </Menu.Item>
        ),

        render: () => (
          <Tab.Pane>
            <h4>Name: {user.name}</h4>
            <h4>
              Gender: {showGenderText()}
              {showGenderIcon()}
            </h4>
            <h4>
              Birthday: {user.birthDate} <Icon fitted name="birthday" />
            </h4>
          </Tab.Pane>
        )
      },
      {
        menuItem: (
          <Menu.Item key={"medication"}>
            <Icon fitted name="pills" />
            Dispensed Medication
          </Menu.Item>
        ),
        render: () => (
          <PatientMedicationDispensePane
            medicationDispenses={medicationDispenses}
          />
        )
      },
      {
        menuItem: (
          <Menu.Item key={"condition"}>
            <Icon fitted name="heartbeat" />
            Condition
          </Menu.Item>
        ),
        render: () => <PatientConditionPane conditions={conditions} />
      },
      {
        menuItem: (
          <Menu.Item key={"carePlan"}>
            <Icon fitted name="unordered list" />
            Care Plan
          </Menu.Item>
        ),
        render: () => <PatientCarePlanPane carePlans={carePlans} />
      }
    ];

    return (
      <div>
        <h1 align="center">Patient Information</h1>
        <Tab
          menu={{ fluid: true, vertical: true, tabular: true }}
          panes={panes}
        />
      </div>
    );
  }
}

export default PatientInfo;
