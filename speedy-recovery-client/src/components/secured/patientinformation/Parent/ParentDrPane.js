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

/* This file defines the ParentDrPane which creates a pane used in the ParentInfo component which displays information
 * about the practitioner taking care of the Parent's child.  
 */

import React, { Component } from "react";
import { Label, Tab, Table} from "semantic-ui-react";
import "./Parent.css";

class ParentDrPane extends Component {
  render() {
    const {patientPractitioners, childResource} = this.props;
    const practitionersNum = patientPractitioners.length;
    const childName = childResource.name.split(" ");

    const createPractitionerTable = () => {
      const table = [];
      if (practitionersNum) {
        const header = [
          <Table.Row key={"practitionerRow"}>
            <Table.HeaderCell id="parentTableCell">#</Table.HeaderCell>
            <Table.HeaderCell id="parentTableCell">Name</Table.HeaderCell>
            <Table.HeaderCell id="parentTableCell">Gender</Table.HeaderCell>
            <Table.HeaderCell id="parentTableCell">Contact Number</Table.HeaderCell>
          </Table.Row>
        ];
        table.push(
          <Table.Header id="parentTableHeader" key="practitionerTableHeader">
            {header}
          </Table.Header>
        );
      }
      const body = [];
      for (let i = 0; i < practitionersNum; i++) {
        const children = [];

        children.push(
          <Table.Cell key={"practitionerOrderCell" + i}>
            <Label color='blue' ribbon>{`${i + 1}`} </Label>
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"practitionerNameCell" + i} id="parentTableCell">
            {<h4>{patientPractitioners[i].name}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"practitionerGenderCell" + i} id="parentTableCell">
            {<h4>{patientPractitioners[i].gender}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"practitionerPhoneCell" + i} id="parentTableCell">
            {<h4>{patientPractitioners[i].phone}</h4>}
          </Table.Cell>
        );
        body.push(
          <Table.Row id="parentTableRow" key={"practitionerRow2" + i}>
            {children}
          </Table.Row>
        );
      }
      table.push(
        <Table.Body key="practitionerTableBody" id="parentTableBody">
          {body}
        </Table.Body>
      );
      const practitionerTable = [];
      practitionerTable.push(<Table key="practitionerTable" color="blue">{table}</Table>);
      return practitionerTable;
    };

    return (
      <div>
        <Tab.Pane>
          <h4>You have {practitionersNum} recorded Practitioners for {childName[0]}</h4>
          {createPractitionerTable()}
        </Tab.Pane>
      </div>
    );
  }
}

export default ParentDrPane;
