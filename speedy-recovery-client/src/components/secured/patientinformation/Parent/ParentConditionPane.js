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

/* This file defines the ParentConditionPane which creates a pane used in the ParentInfo component which displays all
condition information regarding the Parent's child.
*/

import React, { Component } from "react";
import { Label, Tab, Table, Icon } from "semantic-ui-react";
import "./Parent.css";

class ParentConditionPane extends Component {
  render() {
    const { conditions, childResource } = this.props;
    const conditionsNum = conditions.length;
    const childName = childResource.name.split(" ");

    const createConditionTable = () => {
      const table = [];
      if (conditionsNum) {
        const header = [
          <Table.Row key={"conditionRow"}>
            <Table.HeaderCell id="parentTableCell">#</Table.HeaderCell>
            <Table.HeaderCell id="parentTableCell">Summary</Table.HeaderCell>
            <Table.HeaderCell id="parentTableCell">Search</Table.HeaderCell>
            <Table.HeaderCell id="parentTableCell">Time</Table.HeaderCell>
            <Table.HeaderCell id="parentTableCell">Severity</Table.HeaderCell>
            <Table.HeaderCell id="parentTableCell">VerfiedStatus</Table.HeaderCell>
            <Table.HeaderCell id="parentTableCell">ClinicalStatus</Table.HeaderCell>
            <Table.HeaderCell id="parentTableCell">BodySite</Table.HeaderCell>
          </Table.Row>
        ];
        table.push(
          <Table.Header id="parentTableHeader" key="conditionTableHeader">
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
            <Label color='blue' ribbon>{`${i + 1}`} </Label>
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"conditionSummaryCell" + i} id="parentTableCell">
            {<h4>{summary}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"conditionSummarySearchCell" + i} id="parentTableCell">
            {<h4> 
              <a href = {searchQuery}> <Icon color ="blue" fitted name ="search"/> </a>
            </h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"conditionTimeCell" + i} id="parentTableCell">
            {<h4>{conditions[i].onsetDateTime.toString()}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"conditionSeverityCell" + i} id="parentTableCell">
            {<h4>{conditions[i].severity}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"conditionVerificationStatusCell" + i} id="parentTableCell">
            {<h4>{conditions[i].verificationStatus}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"conditionClinicalStatusCell" + i} id="parentTableCell">
            {<h4>{conditions[i].clinicalStatus}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"conditionBodySiteCell" + i} id="parentTableCell">
            {<h4>{conditions[i].bodySite}</h4>}
          </Table.Cell>
        );
        body.push(
          <Table.Row id="parentTableRow" key={"conditionRow2" + i}>
            {children}
          </Table.Row>
        );
      }
      table.push(
        <Table.Body key="conditionTableBody" id="parentTableBody">
          {body}
        </Table.Body>
      );
      const conditionTable = [];
      conditionTable.push(<Table key="conditionTable" color="blue">{table}</Table>);
      return conditionTable;
    };

    return (
      <div>
        <Tab.Pane>
          <h4>You have {conditionsNum} recorded conditions for {childName[0]}.</h4>
          {createConditionTable()}
        </Tab.Pane>
      </div>
    );
  }
}

export default ParentConditionPane;
