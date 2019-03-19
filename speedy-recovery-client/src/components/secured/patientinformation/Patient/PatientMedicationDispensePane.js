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

/* This file defines the PatientMedicationDispensePane which creates a pane used in the PatientInfo component which
displays all medication information regarding the patient
 */

import React, { Component } from "react";
import { Label, Tab, Table } from "semantic-ui-react";
import "./PatientInfo.css";
import {isBrowser, isTablet} from 'react-device-detect';

class PatientMedicationDispensePane extends Component {
  render() {
    const { medicationDispenses } = this.props;
    const medicationDispensesNum = medicationDispenses.length;
    const createMedicationDispenseTable = () => {
      const table = [];
      if (medicationDispensesNum) {
        const header = [
          <Table.Row key={"medicationDRow"}>
            {isBrowser || isTablet ? <Table.HeaderCell id="patientTableCell">#</Table.HeaderCell> : null}
            <Table.HeaderCell id="patientTableCell">Medication</Table.HeaderCell>
            {isBrowser || isTablet ? <Table.HeaderCell id="patientTableCell">Quantity</Table.HeaderCell> : null}
            {isBrowser || isTablet ? <Table.HeaderCell id="patientTableCell">Supply Time</Table.HeaderCell> : null}
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

        if (isTablet || isBrowser) {
          children.push(
              <Table.Cell key={"medicationDOrderCell" + i}>
                <Label ribbon>{`${i + 1}`} </Label>
              </Table.Cell>
          );
        }
        children.push(
          <Table.Cell key={"medicationDNameCell" + i} id="patientTableCell">
            {<h4>{name}</h4>}
          </Table.Cell>
        );

        if (isBrowser || isTablet) {
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
        }
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
      medicationDTable.push(<Table key="medicationDTable" color="blue">{table}</Table>);
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
