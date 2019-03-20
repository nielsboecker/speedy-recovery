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

/* This file defines the Patient's family History which creates a pane used in the Practitioner's PatientInfo component which displays all
   Goal information regarding the patient
 */

import React, { Component } from "react";
import { Label, Tab, Table } from "semantic-ui-react";
import "./PractitionerInfo.css";

class PractitionerFamilyHistory extends Component {
  render() {
    const { histories } = this.props;
    const historiesNum = histories.length;
    const createFamilyHistoryTable = () => {
      const table = [];
      if (historiesNum) {
        const header = [
          <Table.Row key={"historiesRow"}>
            <Table.HeaderCell id="patientTableCell">#</Table.HeaderCell>
            <Table.HeaderCell id="patientTableCell">Name</Table.HeaderCell>
            <Table.HeaderCell id="patientTableCell">
              Relationship
            </Table.HeaderCell>
            <Table.HeaderCell id="patientTableCell">
              Cause of Death
            </Table.HeaderCell>
            <Table.HeaderCell id="patientTableCell">
              Death date
            </Table.HeaderCell>
          </Table.Row>
        ];
        table.push(
          <Table.Header key="HistoriesTableHeader" id="patientTableHeader">
            {header}
          </Table.Header>
        );
      }
      const body = [];
      for (let i = 0; i < historiesNum; i++) {
        const children = [];

        children.push(
          <Table.Cell key={"historiesCell0" + i}>
            <Label ribbon color="blue">
              {`${i + 1}`}{" "}
            </Label>
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"historiesCell1" + i} id="patientTableCell">
            {<h4>{histories[i].name}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"historyCell2" + i} id="patientTableCell">
            {<h4>{histories[i].relationship}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"historyCell3" + i} id="patientTableCell">
            {<h4>{histories[i].causeOfDeath}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"historyCell4" + i} id="patientTableCell">
            {<h4>{histories[i].date}</h4>}
          </Table.Cell>
        );

        body.push(
          <Table.Row key={"historyRow2" + i} id="patientTableRow">
            {children}
          </Table.Row>
        );
      }
      table.push(
        <Table.Body key="historiesTableBody" id="patientTableBody">
          {body}
        </Table.Body>
      );
      const historiesTable = [];
      historiesTable.push(
        <Table key="historiesTable" color="blue">
          {table}
        </Table>
      );
      return historiesTable;
    };

    return (
      <div>
        <Tab.Pane>
          <h4>There are {historiesNum} recorded family history for this patient.</h4>
          {createFamilyHistoryTable()}
        </Tab.Pane>
      </div>
    );
  }
}

export default PractitionerFamilyHistory;
