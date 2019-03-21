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

/* This file defines the PractitionerCarePlanePane which creates a pane used in the PractitionerInfo component which displays all
care plan information regarding the patient
 */

import React, { Component } from "react";
import { Label, Tab, Table } from "semantic-ui-react";
import "./PractitionerInfo.css";
import { isTablet, isBrowser } from "react-device-detect"

class PractitionerCarePlanPane extends Component {
    render() {
        const { carePlans } = this.props;
        const carePlansNum = carePlans.length;

        const createCarePlanTable = () => {
            const table = [];
            if (carePlansNum) {
                const header = [
                    <Table.Row key={"carePlanRow"}>
                        {isBrowser || isTablet ? <Table.HeaderCell id="parentTableCell">#</Table.HeaderCell> : null}
                        {isBrowser || isTablet ?
                            <Table.HeaderCell id="parentTableCell">Category</Table.HeaderCell> : null}
                        <Table.HeaderCell id="parentTableCell">Care Plans</Table.HeaderCell>
                        {isBrowser || isTablet ?
                            <Table.HeaderCell id="parentTableCell">Status</Table.HeaderCell> : null}
                        {isBrowser || isTablet ?
                            <Table.HeaderCell id="parentTableCell">Period</Table.HeaderCell> : null}
                    </Table.Row>
                ];
                table.push(
                    <Table.Header key="carePlanTableHeader" id="parentTableHeader">
                        {header}
                    </Table.Header>
                );
            }
            const body = [];
            for (let i = 0; i < carePlansNum; i++) {
                const children = [];


                    children.push(
                        <Table.Cell key={"carePlanOrderCell" + i}>
                            <Label color="blue" ribbon>
                                {`${i + 1}`}{" "}
                            </Label>
                        </Table.Cell>
                    );
                if (isTablet || isBrowser) {
                    children.push(
                        <Table.Cell key={"carePlanCategoryCell" + i} id="parentTableCell">
                            {<h4>{carePlans[i].category}</h4>}
                        </Table.Cell>
                    );
                }
                children.push(
                    <Table.Cell key={"carePlanActCell" + i} id="parentTableCell">
                        {<h4>{carePlans[i].activities}</h4>}
                    </Table.Cell>
                );
                if (isTablet || isBrowser) {
                    children.push(
                        <Table.Cell key={"carePlanStatusCell" + i} id="parentTableCell">
                            {<h4>{carePlans[i].status}</h4>}
                        </Table.Cell>
                    );
                    children.push(
                        <Table.Cell key={"carePlanPeriodCell" + i} id="parentTableCell">
                            {<h4>{carePlans[i].period}</h4>}
                        </Table.Cell>
                    );
                }
                body.push(
                    <Table.Row key={"carePlanRow2" + i} id="parentTableRow">
                        {children}
                    </Table.Row>
                );
            }
            table.push(
                <Table.Body key="carePlanTableBody" id="parentTableBody">
                    {body}
                </Table.Body>
            );
            const carePlanTable = [];
            carePlanTable.push(
                <Table key="carePlanTable" color="blue">
                    {table}
                </Table>
            );
            return carePlanTable;
        };

        return (
            <div>
                <Tab.Pane>
                    <h4>
                        There are {carePlansNum} recorded care plan for this patient.
                    </h4>
                    {createCarePlanTable()}
                </Tab.Pane>
            </div>
        );
    }
}

export default PractitionerCarePlanPane;
