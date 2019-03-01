import React, { Component } from "react";
import { Tab } from "semantic-ui-react";

class PatientInfo extends Component {
  render() {
    const { user } = this.props;
    const panes = [
      {
        menuItem: "Basic",
        render: () => (
          <Tab.Pane>
            <h4>Name: {user.name}</h4>
            <h4>Gender: {user.gender}</h4>
            <h4>Birthday: {user.birthDate}</h4>
          </Tab.Pane>
        )
      },
      {
        menuItem: "Medication",
        render: () => <Tab.Pane>Medication Content</Tab.Pane>
      },
      {
        menuItem: "Condition",
        render: () => <Tab.Pane>Condition Content</Tab.Pane>
      },
      {
        menuItem: "CarePlan",
        render: () => <Tab.Pane>Care Plan Content</Tab.Pane>
      }
    ];

    return (
      <div>
        <h1>Patient Information For Patient View</h1>
        <Tab
          menu={{ fluid: true, vertical: true, tabular: true }}
          panes={panes}
        />
      </div>
    );
  }
}

export default PatientInfo;
