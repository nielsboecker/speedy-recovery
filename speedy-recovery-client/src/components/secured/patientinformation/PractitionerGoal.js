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
   goal information regarding the patient
 */

import React, { Component } from "react";
import { Label, Tab, Table } from "semantic-ui-react";
import "./PatientInfo.css";

class PractitionerGoal extends Component {
  render() {
    const { goal } = this.props;
    const goalNum = goal.length;
    const createGoalTable = () => {
      const table = [];
      if (goalNum) {
        const header = [
          <Table.Row key={"historiesRow"}>
            <Table.HeaderCell id="patientTableCell">#</Table.HeaderCell>
            <Table.HeaderCell id="patientTableCell">Goal</Table.HeaderCell>
            <Table.HeaderCell id="patientTableCell">Priority</Table.HeaderCell>
            <Table.HeaderCell id="patientTableCell">
              Description
            </Table.HeaderCell>
            <Table.HeaderCell id="patientTableCell">
              Start date
            </Table.HeaderCell>
            <Table.HeaderCell id="patientTableCell">Due date</Table.HeaderCell>
          </Table.Row>
        ];
        table.push(
          <Table.Header key="carePlanTableHeader" id="patientTableHeader">
            {header}
          </Table.Header>
        );
      }
      const body = [];
      for (let i = 0; i < goalNum; i++) {
        const children = [];

        children.push(
          <Table.Cell key={"goalCell" + i}>
            <Label ribbon>{`${i + 1}`} </Label>
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"goalCell" + i} id="patientTableCell">
            {<h4>{goal[i].goal}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"goalCell" + i} id="patientTableCell">
            {<h4>{goal[i].priority}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"goalCell" + i} id="patientTableCell">
            {<h4>{goal[i].description}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"goalCell" + i} id="patientTableCell">
            {<h4>{goal[i].startDate}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"goalCell" + i} id="patientTableCell">
            {<h4>{goal[i].dueDate}</h4>}
          </Table.Cell>
        );

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
      goalTable.push(<Table key="goalTable">{table}</Table>);
      return goalTable;
    };

    return (
      <div>
        <Tab.Pane>
          <h4>You have {goalNum} goal.</h4>
          {createGoalTable()}
        </Tab.Pane>
      </div>
    );
  }
}

export default PractitionerGoal;
