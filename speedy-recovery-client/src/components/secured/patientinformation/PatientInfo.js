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

/* This file defines the PatientInfo component which creates an information page for the patient describing several
different aspects of their hospitalisation.
 */

import React, { Component } from "react";
import { Icon, Menu, Tab } from "semantic-ui-react";
import "./PatientInfo.css";
import PatientConditionPane from "./PatientConditionPane";
import PatientCarePlanPane from "./PatientCarePlanPane";
import PatientMedicationDispensePane from "./PatientMedicationDispensePane";
import PatientBasicPane from "./PatientBasicPane";

class PatientInfo extends Component {
  render() {
    const { user, conditions, medicationDispenses, carePlans } = this.props;

    // Builds up table of panes, each containing different pieces of info about patient
    const panes = [
      {
        menuItem: (
          <Menu.Item key={"basic"}>
            <Icon fitted name="id card outline" />
            Basic
          </Menu.Item>
        ),

        render: () => <PatientBasicPane user={user} />
      },
      {
        menuItem: (
          <Menu.Item key={"medication"}>
            <Icon fitted name="pills" />
            Dispensed Medication
          </Menu.Item>
        ),
        render: () => (
          <PatientMedicationDispensePane
            medicationDispenses={medicationDispenses}
          />
        )
      },
      {
        menuItem: (
          <Menu.Item key={"condition"}>
            <Icon fitted name="heartbeat" />
            Condition
          </Menu.Item>
        ),
        render: () => <PatientConditionPane conditions={conditions} />
      },
      {
        menuItem: (
          <Menu.Item key={"carePlan"}>
            <Icon fitted name="unordered list" />
            Care Plan
          </Menu.Item>
        ),
        render: () => <PatientCarePlanPane carePlans={carePlans} />
      }
    ];

    return (
      <div>
        <h1 align="center">Patient Information</h1>
        <Tab
          menu={{ fluid: true, vertical: true, tabular: true }}
          panes={panes}
        />
      </div>
    );
  }
}

export default PatientInfo;
