import React, { Component } from "react";
import { Icon, Label, Menu, Tab, Table } from "semantic-ui-react";
class PatientInfo extends Component {
  render() {
    const { user, conditions, medicationDispenses, carePlans } = this.props;

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

    const carePlansNum = carePlans.length;
    const createCarePlanTable = () => {
      let table = [];
      if (carePlansNum) {
        let header = [
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Activities</Table.HeaderCell>
            <Table.HeaderCell>Period</Table.HeaderCell>
          </Table.Row>
        ];
        table.push(<Table.Header>{header}</Table.Header>);
      }
      let body = [];
      for (let i = 0; i < carePlansNum; i++) {
        let children = [];

        children.push(
          <Table.Cell>
            <Label ribbon>{`${i + 1}`} </Label>
          </Table.Cell>
        );
        children.push(
          <Table.Cell>{<h4>{carePlans[i].category}</h4>}</Table.Cell>
        );
        children.push(
          <Table.Cell>{<h4>{carePlans[i].activities}</h4>}</Table.Cell>
        );
        children.push(
          <Table.Cell>{<h4>{carePlans[i].period}</h4>}</Table.Cell>
        );

        body.push(<Table.Row>{children}</Table.Row>);
      }
      table.push(<Table.Body>{body}</Table.Body>);
      return table;
    };

    const showGenderText = () => {
      let genderStr = "";
      let gender = user.gender;
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
      let gender = user.gender;
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
          <Menu.Item>
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
        render: () => (
          <Tab.Pane>
            <h4>How many recorded care plans? {carePlansNum}</h4>
            {createCarePlanTable()}
          </Tab.Pane>
        )
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
