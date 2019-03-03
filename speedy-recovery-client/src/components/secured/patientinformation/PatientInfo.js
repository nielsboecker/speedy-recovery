import React, { Component } from "react";
import { Tab, Icon, Menu, Table, Label } from "semantic-ui-react";

class PatientInfo extends Component {
  render() {
    const { user, conditions } = this.props;
    const conditionsNum = conditions.length;
    const createTable = () => {
      let table = [];
      if (conditionsNum) {
        let header = [
          <Table.Row>
            <Table.HeaderCell>Order</Table.HeaderCell>
            <Table.HeaderCell>Summary</Table.HeaderCell>
          </Table.Row>
        ];
        table.push(<Table.Header>{header}</Table.Header>);
      }
      let body = [];
      for (let i = 0; i < conditionsNum; i++) {
        let children = [];
        children.push(
          <Table.Cell>
            <Label ribbon>{`${i + 1}`} </Label>
          </Table.Cell>
        );
        children.push(
          <Table.Cell>{<h4>{conditions[i].summary}</h4>}</Table.Cell>
        );
        body.push(<Table.Row>{children}</Table.Row>);
      }
      table.push(<Table.Body>{body}</Table.Body>);
      return table;
    };

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
        render: () => (
          <Tab.Pane>
            <h4>How many recorded conditions? {conditionsNum}</h4>
            {createTable()}
            <h4>{conditions[0].summary}</h4>
          </Tab.Pane>
        )
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
