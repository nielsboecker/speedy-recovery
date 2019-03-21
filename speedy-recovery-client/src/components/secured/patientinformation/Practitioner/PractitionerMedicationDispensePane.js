/*
 * Speedy Recovery -- A patient-centred app based on the FHIR standard facilitating communication between paediatric
 * patients, parents and hospital staff
 *
 * Copyright (C) 2019 University College London
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not,
 * see http://www.gnu.org/license/.
 * */
/* This file defines the PractitionerMedicationDispensePane which creates a pane used in the PractitionerInfo component which
displays all medication information regarding the patient
 */
import React, { Component } from "react";
import { Icon, Label, Tab, Table } from "semantic-ui-react";
import "./PractitionerInfo.css";

class PractitionerMedicationDispensePane extends Component {
  render() {
    const { medicationDispenses } = this.props;
    const medicationDispensesNum = medicationDispenses.length;

    const createMedicationDispenseTable = () => {
      const table = [];
      if (medicationDispensesNum) {
        const header = [
          <Table.Row key={"medicationDRow"}>
            <Table.HeaderCell id="parentTableCell">#</Table.HeaderCell>
            <Table.HeaderCell id="parentTableCell">Name</Table.HeaderCell>
            <Table.HeaderCell id="parentTableCell">Search</Table.HeaderCell>
            <Table.HeaderCell id="parentTableCell">Quantity</Table.HeaderCell>
            <Table.HeaderCell id="parentTableCell">
              Days Supply
            </Table.HeaderCell>
            <Table.HeaderCell id="parentTableCell">Status</Table.HeaderCell>
            <Table.HeaderCell id="parentTableCell">
              Intake Form
            </Table.HeaderCell>
            <Table.HeaderCell id="parentTableCell">
              Intake Number
            </Table.HeaderCell>
          </Table.Row>
        ];
        table.push(
          <Table.Header id="parentTableHeader" key="medicationDTableHeader">
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
          <Table.Cell key={"medicationOrderCell" + i}>
            <Label ribbon color="blue">
              {`${i + 1}`}{" "}
            </Label>
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"medicationNameCell" + i} id="parentTableCell">
            {name}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"medicationSearchCell" + i} id="parentTableCell">
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
          <Table.Cell key={"medicationQuantityCell" + i} id="parentTableCell">
            {<h4>{medicationDispenses[i].quantity}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"medicationSupplyCell" + i} id="parentTableCell">
            {<h4>{medicationDispenses[i].daysSupply}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"medicationStatusCell" + i} id="parentTableCell">
            {<h4>{medicationDispenses[i].status}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell
            key={"medicationIntakeMethodCell" + i}
            id="parentTableCell"
          >
            {<h4>{medicationDispenses[i].intakeMethod}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"medicationTimeCell" + i} id="parentTableCell">
            {
              <h4>
                {medicationDispenses[i].dosageFrequency} time for{" "}
                {medicationDispenses[i].dosagePeriod} days
              </h4>
            }
          </Table.Cell>
        );
        body.push(
          <Table.Row key={"medicationRow2" + i} id="parentTableRow">
            {children}
          </Table.Row>
        );
      }
      table.push(
        <Table.Body key="medicationTableBody" id="parentTableBody">
          {body}
        </Table.Body>
      );
      const medicationDTable = [];
      medicationDTable.push(
        <Table key="medicationTable" color="blue">
          {table}
        </Table>
      );
      return medicationDTable;
    };

    return (
      <div>
        <Tab.Pane>
          <h4>
            There are {medicationDispensesNum} dispensed medication records
          </h4>
          {createMedicationDispenseTable()}
        </Tab.Pane>
      </div>
    );
  }
}

export default PractitionerMedicationDispensePane;