import React, { Component } from "react";
import { Label, Tab, Table } from "semantic-ui-react";
import "./PatientInfo.css";

class PatientCarePlanPane extends Component {
  render() {
    const { carePlans } = this.props;
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

    return (
      <div>
        <Tab.Pane>
          <h4>You have {carePlansNum} recorded care plans.</h4>
          {createCarePlanTable()}
        </Tab.Pane>
      </div>
    );
  }
}

export default PatientCarePlanPane;
