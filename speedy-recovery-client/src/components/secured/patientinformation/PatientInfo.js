import React, { Component } from "react";
import { Icon, Label, Menu, Tab, Table } from "semantic-ui-react";
import "./PatientInfo.css";

class PatientInfo extends Component {
  render() {
    const { user, conditions, medicationDispenses, carePlans } = this.props;
    const conditionsNum = conditions.length;
    const createConditionTable = () => {
      const table = [];
      if (conditionsNum) {
        const header = [
          <Table.Row key={"conditionRow"}>
            <Table.HeaderCell id="patientTableCell">#</Table.HeaderCell>
            <Table.HeaderCell id="patientTableCell">Summary</Table.HeaderCell>
            <Table.HeaderCell id="patientTableCell" />
            <Table.HeaderCell id="patientTableCell">Time</Table.HeaderCell>
          </Table.Row>
        ];
        table.push(
          <Table.Header id="patientTableHeader" key="conditionTableHeader">
            {header}
          </Table.Header>
        );
      }
      const body = [];
      for (let i = 0; i < conditionsNum; i++) {
        const children = [];
        const summary = conditions[i].summary;
        const searchQuery = "https://www.google.com/search?q=" + summary;

        children.push(
          <Table.Cell key={"conditionOrderCell" + i}>
            <Label ribbon>{`${i + 1}`} </Label>
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"conditionSummaryCell" + i} id="patientTableCell">
            {<h4>{summary}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"conditionSearchCell" + i} id="patientTableCell">
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
          <Table.Cell key={"conditionTimeCell" + i} id="patientTableCell">
            {<h4>{conditions[i].onsetDateTime.toString()}</h4>}
          </Table.Cell>
        );
        body.push(
          <Table.Row id="patientTableRow" key={"conditionRow2" + i}>
            {children}
          </Table.Row>
        );
      }
      table.push(
        <Table.Body key="conditionTableBody" id="patientTableBody">
          {body}
        </Table.Body>
      );
      const conditionTable = [];
      conditionTable.push(<Table key="conditionTable">{table}</Table>);
      return conditionTable;
    };

    const medicationDispensesNum = medicationDispenses.length;
    const createMedicationDispenseTable = () => {
      const table = [];
      if (medicationDispensesNum) {
        const header = [
          <Table.Row key={"medicationDRow"}>
            <Table.HeaderCell id="patientTableCell">#</Table.HeaderCell>
            <Table.HeaderCell id="patientTableCell">Name</Table.HeaderCell>
            <Table.HeaderCell id="patientTableCell" />
            <Table.HeaderCell id="patientTableCell">Quantity</Table.HeaderCell>
            <Table.HeaderCell id="patientTableCell">
              Supply Time Length
            </Table.HeaderCell>
          </Table.Row>
        ];
        table.push(
          <Table.Header id="patientTableHeader" key="medicationDTableHeader">
            {header}
          </Table.Header>
        );
      }
      const body = [];
      for (let i = 0; i < medicationDispensesNum; i++) {
        const children = [];
        const name = medicationDispenses[i].name;
        const searchQuery = "https://www.google.com/search?q=" + name;

        children.push(
          <Table.Cell key={"medicationDOrderCell" + i}>
            <Label ribbon>{`${i + 1}`} </Label>
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"medicationDNameCell" + i} id="patientTableCell">
            {<h4>{name}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"medicationDSearchCell" + i} id="patientTableCell">
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
          <Table.Cell key={"medicationDQuantityCell" + i} id="patientTableCell">
            {<h4>{medicationDispenses[i].quantity}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"medicationDSupplyCell" + i} id="patientTableCell">
            {<h4>{medicationDispenses[i].daysSupply}</h4>}
          </Table.Cell>
        );
        body.push(
          <Table.Row key={"medicationDRow2" + i} id="patientTableRow">
            {children}
          </Table.Row>
        );
      }
      table.push(
        <Table.Body key="medicationDTableBody" id="patientTableBody">
          {body}
        </Table.Body>
      );
      const medicationDTable = [];
      medicationDTable.push(<Table key="medicationDTable">{table}</Table>);
      return medicationDTable;
    };

    const carePlansNum = carePlans.length;
    const createCarePlanTable = () => {
      const table = [];
      if (carePlansNum) {
        const header = [
          <Table.Row key={"carePlanRow"}>
            <Table.HeaderCell id="patientTableCell">#</Table.HeaderCell>
            <Table.HeaderCell id="patientTableCell">Category</Table.HeaderCell>
            <Table.HeaderCell id="patientTableCell">
              Activities
            </Table.HeaderCell>
            <Table.HeaderCell id="patientTableCell">Period</Table.HeaderCell>
          </Table.Row>
        ];
        table.push(
          <Table.Header key="carePlanTableHeader" id="patientTableHeader">
            {header}
          </Table.Header>
        );
      }
      const body = [];
      for (let i = 0; i < carePlansNum; i++) {
        const children = [];

        children.push(
          <Table.Cell key={"carePlanOrderCell" + i}>
            <Label ribbon>{`${i + 1}`} </Label>
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"carePlanCategoryCell" + i} id="patientTableCell">
            {<h4>{carePlans[i].category}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"carePlanActCell" + i} id="patientTableCell">
            {<h4>{carePlans[i].activities}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"carePlanPeriodCell" + i} id="patientTableCell">
            {<h4>{carePlans[i].period}</h4>}
          </Table.Cell>
        );

        body.push(
          <Table.Row key={"carePlanRow2" + i} id="patientTableRow">
            {children}
          </Table.Row>
        );
      }
      table.push(
        <Table.Body key="carePlanTableBody" id="patientTableBody">
          {body}
        </Table.Body>
      );
      const carePlanTable = [];
      carePlanTable.push(<Table key="carePlanTable">{table}</Table>);
      return carePlanTable;
    };

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
          <Menu.Item key={"condition"}>
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
          <Menu.Item key={"carePlan"}>
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
