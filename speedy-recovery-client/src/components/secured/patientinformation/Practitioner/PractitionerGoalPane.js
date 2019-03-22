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

/* This file defines the Patient's Goal which creates a pane used in the Practitioner's PatientInfo component which displays all
   goal information regarding the patient
 */

import React, { Component } from "react";
import { Label, Tab, Table } from "semantic-ui-react";
import "./PractitionerInfo.css";
import { isTablet, isBrowser } from "react-device-detect";

class PractitionerGoalPane extends Component {
  render() {
    const { goal } = this.props;
    const goalNum = goal.length;
    const createGoalTable = () => {
      const table = [];
      if (goalNum) {
        const header = [
          <Table.Row key={"historiesRow"}>
            {isBrowser || isTablet ? (
              <Table.HeaderCell id="patientTableCell">#</Table.HeaderCell>
            ) : null}
            {isBrowser || isTablet ? (
              <Table.HeaderCell id="patientTableCell">Goal</Table.HeaderCell>
            ) : null}
            {isBrowser || isTablet ? (
              <Table.HeaderCell id="patientTableCell">
                Priority
              </Table.HeaderCell>
            ) : null}
            <Table.HeaderCell id="patientTableCell">Goal</Table.HeaderCell>
            {isBrowser || isTablet ? (
              <Table.HeaderCell id="patientTableCell">
                Start date
              </Table.HeaderCell>
            ) : null}
            {isBrowser || isTablet ? (
              <Table.HeaderCell id="patientTableCell">
                Due date
              </Table.HeaderCell>
            ) : null}
          </Table.Row>
        ];
        table.push(
          <Table.Header key="goalTableHeader" id="patientTableHeader">
            {header}
          </Table.Header>
        );
      }
      const body = [];
      for (let i = 0; i < goalNum; i++) {
        const children = [];

        children.push(
          <Table.Cell key={"goalCell0" + i}>
            <Label ribbon color="blue">
              {`${i + 1}`}{" "}
            </Label>
          </Table.Cell>
        );
        if (isBrowser || isTablet) {
          children.push(
            <Table.Cell key={"goalCell1" + i} id="patientTableCell">
              {<h4>{goal[i].goal}</h4>}
            </Table.Cell>
          );
          children.push(
            <Table.Cell key={"goalCell2" + i} id="patientTableCell">
              {<h4>{goal[i].priority}</h4>}
            </Table.Cell>
          );
        }
        children.push(
          <Table.Cell key={"goalCell3" + i} id="patientTableCell">
            {<h4>{goal[i].description}</h4>}
          </Table.Cell>
        );
        if (isBrowser || isTablet) {
          children.push(
            <Table.Cell key={"goalCell4" + i} id="patientTableCell">
              {<h4>{goal[i].startDate}</h4>}
            </Table.Cell>
          );
          children.push(
            <Table.Cell key={"goalCell5" + i} id="patientTableCell">
              {<h4>{goal[i].dueDate}</h4>}
            </Table.Cell>
          );
        }
        body.push(
          <Table.Row key={"goalRow2" + i} id="patientTableRow">
            {children}
          </Table.Row>
        );
      }
      table.push(
        <Table.Body key="goalTableBody" id="patientTableBody">
          {body}
        </Table.Body>
      );
      const goalTable = [];
      goalTable.push(
        <Table key="goalTable" color="blue">
          {table}
        </Table>
      );
      return goalTable;
    };

    return (
      <div>
        <Tab.Pane>
          <h4>There are {goalNum} recorded goals for this patient.</h4>
          {createGoalTable()}
        </Tab.Pane>
      </div>
    );
  }
}

export default PractitionerGoalPane;
