import React, { Component } from "react";
import { Tab, Icon, Menu } from "semantic-ui-react";

class PatientInfo extends Component {
  render() {
    const { user, conditions } = this.props;
    const panes = [
      {
        menuItem: (
          <Menu.Item>
            <Icon fitted name="id card outline" />
            Basic
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <h4>Name: {user.name}</h4>
            <h4>Gender: {user.gender}</h4>
            <h4>Birthday: {user.birthDate}</h4>
          </Tab.Pane>
        )
      },
      {
        menuItem: (
          <Menu.Item>
            <Icon fitted name="pills" />
            Medication
          </Menu.Item>
        ),
        render: () => <Tab.Pane>Medication Content</Tab.Pane>
      },
      {
        menuItem: (
          <Menu.Item>
            <Icon fitted name="heartbeat" />
            Condition
          </Menu.Item>
        ),

        render: () => <Tab.Pane>{conditions[0].summary}</Tab.Pane>
      },
      {
        menuItem: (
          <Menu.Item>
            <Icon fitted name="unordered list" />
            Care Plan
          </Menu.Item>
        ),
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
