import React, { Component } from "react";
import { Icon, Label, Tab, Table } from "semantic-ui-react";
import "./PatientInfo.css";

class PatientMedicationDispensePane extends Component {
  render() {
    const { medicationDispenses } = this.props;
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

    return (
      <div>
        <Tab.Pane>
          <h4>
            You have {medicationDispensesNum} dispensed medications in the
            records.
          </h4>
          {createMedicationDispenseTable()}
        </Tab.Pane>
      </div>
    );
  }
}

export default PatientMedicationDispensePane;
