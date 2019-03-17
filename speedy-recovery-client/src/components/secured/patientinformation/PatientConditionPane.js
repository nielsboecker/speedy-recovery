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

/* This file defines the PatientCarePlanPane which creates a pane used in the PatientInfo component which displays all
condition information regarding the patient.
 */

import React, { Component } from "react";
import { Label, Tab, Table } from "semantic-ui-react";
import "./PatientInfo.css";
import {isBrowser, isTablet} from 'react-device-detect';

class PatientConditionPane extends Component {
  render() {
    const { conditions } = this.props;
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
        const mobileHeader = [
          <Table.Row key={"conditionRow"}>
            <Table.HeaderCell id="patientTableCell">Summary</Table.HeaderCell>
          </Table.Row>
        ];
        table.push(
          <Table.Header id="patientTableHeader" key="conditionTableHeader">
            {isBrowser || isTablet ? header : mobileHeader}
          </Table.Header>
        );
      }
      const body = [];
      for (let i = 0; i < conditionsNum; i++) {
        const children = [];
        const summary = conditions[i].summary;

        if (isTablet || isBrowser) {
          children.push(
              <Table.Cell key={"conditionOrderCell" + i}>
                <Label ribbon>{`${i + 1}`} </Label>
              </Table.Cell>
          );
        }
          children.push(
              <Table.Cell key={"conditionSummaryCell" + i} id="patientTableCell">
                {<h4>{summary}</h4>}
              </Table.Cell>
          );
        if (isTablet || isBrowser) {
          children.push(
              <Table.Cell key={"conditionTimeCell" + i} id="patientTableCell">
                {<h4>{conditions[i].onsetDateTime.toString()}</h4>}
              </Table.Cell>
          );
        }
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

    return (
      <div>
        <Tab.Pane>
          <h4>You have {conditionsNum} recorded conditions.</h4>
          {createConditionTable()}
        </Tab.Pane>
      </div>
    );
  }
}

export default PatientConditionPane;
