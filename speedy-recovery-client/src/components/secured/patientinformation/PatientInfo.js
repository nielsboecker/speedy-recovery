import React, { Component } from "react";
import { Icon, Menu, Tab } from "semantic-ui-react";
import "./PatientInfo.css";
import PatientConditionPane from "./PatientConditionPane";
import PatientCarePlanPane from "./PatientCarePlanPane";
import PatientMedicationDispensePane from "./PatientMedicationDispensePane";
import PatientBasicPane from "./PatientBasicPane";

class PatientInfo extends Component {
  render() {
    const { user, conditions, medicationDispenses, carePlans } = this.props;

    const panes = [
      {
        menuItem: (
          <Menu.Item key={"basic"}>
            <Icon fitted name="id card outline" />
            Basic
          </Menu.Item>
        ),

        render: () => <PatientBasicPane user={user} />
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
