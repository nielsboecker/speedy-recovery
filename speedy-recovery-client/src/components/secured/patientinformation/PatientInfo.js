import React, { Component } from "react";
import { Icon, Label, Menu, Tab, Table } from "semantic-ui-react";
import "./PatientInfo.css";
class PatientInfo extends Component {
  render() {
    const { user, conditions, medicationDispenses } = this.props;
    const conditionsNum = conditions.length;
    const createConditionTable = () => {
      let table = [];
      if (conditionsNum) {
        let header = [
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Summary</Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell>Time</Table.HeaderCell>
          </Table.Row>
        ];
        table.push(<Table.Header>{header}</Table.Header>);
      }
      let body = [];
      for (let i = 0; i < conditionsNum; i++) {
        let children = [];
        let summary = conditions[i].summary;
        let searchQuery = "https://www.google.com/search?q=" + summary;

        children.push(
          <Table.Cell>
            <Label ribbon>{`${i + 1}`} </Label>
          </Table.Cell>
        );
        children.push(<Table.Cell>{<h4>{summary}</h4>}</Table.Cell>);
        children.push(
          <Table.Cell>
            {
              <h4>
                <a href={searchQuery}>
                  <Icon fitted name="search" />
                </a>
              </h4>
            }
          </Table.Cell>
        );
        children.push(
          <Table.Cell>
            {<h4>{conditions[i].onsetDateTime.toString()}</h4>}
          </Table.Cell>
        );
        body.push(<Table.Row>{children}</Table.Row>);
      }
      table.push(<Table.Body>{body}</Table.Body>);
      return table;
    };

    const medicationDispensesNum = medicationDispenses.length;
    const createMedicationDispenseTable = () => {
      let table = [];
      if (medicationDispensesNum) {
        let header = [
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Supply Time Length</Table.HeaderCell>
          </Table.Row>
        ];
        table.push(<Table.Header>{header}</Table.Header>);
      }
      let body = [];
      for (let i = 0; i < medicationDispensesNum; i++) {
        let children = [];
        let name = medicationDispenses[i].name;
        let searchQuery = "https://www.google.com/search?q=" + name;

        children.push(
          <Table.Cell>
            <Label ribbon>{`${i + 1}`} </Label>
          </Table.Cell>
        );
        children.push(<Table.Cell>{<h4>{name}</h4>}</Table.Cell>);
        children.push(
          <Table.Cell>
            {
              <h4>
                <a href={searchQuery}>
                  <Icon fitted name="search" />
                </a>
              </h4>
            }
          </Table.Cell>
        );
        children.push(
          <Table.Cell>{<h4>{medicationDispenses[i].quantity}</h4>}</Table.Cell>
        );
        children.push(
          <Table.Cell>
            {<h4>{medicationDispenses[i].daysSupply}</h4>}
          </Table.Cell>
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
            Dispensed Medication
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <h4>
              How many dispensed medication in the records?{" "}
              {medicationDispensesNum}
            </h4>
            {createMedicationDispenseTable()}
          </Tab.Pane>
        )
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
            {createConditionTable()}
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
