import React, { Component } from "react";
import { Label, Tab, Table } from "semantic-ui-react";
import "./PatientInfo.css";

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
        table.push(
          <Table.Header id="patientTableHeader" key="conditionTableHeader">
            {header}
          </Table.Header>
        );
      }
      const body = [];
      for (let i = 0; i < conditionsNum; i++) {
        const children = [];
        const summary = conditions[i].summary;

        children.push(
          <Table.Cell key={"conditionOrderCell" + i}>
            <Label ribbon>{`${i + 1}`} </Label>
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"conditionSummaryCell" + i} id="patientTableCell">
            {<h4>{summary}</h4>}
          </Table.Cell>
        );
        children.push(
          <Table.Cell key={"conditionTimeCell" + i} id="patientTableCell">
            {<h4>{conditions[i].onsetDateTime.toString()}</h4>}
          </Table.Cell>
        );
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
