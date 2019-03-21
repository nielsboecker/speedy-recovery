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

/* This file defines the ParentInfo component which creates an patient info page tailored to parents
 */

import React, { Component } from "react";
import { Icon, Menu, Tab } from "semantic-ui-react";
import ParentConditionPane from "./ParentConditionPane";
import ParentCarePlanPane from "./ParentCarePlanPane";
import ParentMedicationPane from "./ParentMedicationPane";
import ParentBasicPane from "./ParentBasicPane";
import ParentDrPane from "./ParentDrPane"
import {isBrowser, isTablet} from 'react-device-detect';

class ParentInfo extends Component {
  render() {
    const {
      conditions,
      medicationDispenses,
      carePlans,
      childResource,
      patientPractitioners
    } = this.props;

    // Builds up table of panes, each containing different pieces of info about patient
    const panes = [
      {
        menuItem: (
          <Menu.Item key={"basic"} color="blue">
            <Icon fitted name="id card outline" color ="blue" size={isBrowser || isTablet ? "large" : "small"}/>
            {isBrowser || isTablet ? "Basic" : ""}
          </Menu.Item>
        ),
        render: () => <ParentBasicPane childResource={childResource} />
      },
      {
        menuItem: (
          <Menu.Item key={"medication"} color="blue">
            <Icon fitted name="pills" color="purple" size={isBrowser || isTablet ? "large" : "small"}/>
              {isBrowser || isTablet ? "Dispensed Medication" : ""}
          </Menu.Item>
        ),
        render: () => (
          <ParentMedicationPane
            medicationDispenses={medicationDispenses}
            childResource={childResource}
          />
        )
      },
      {
        menuItem: (
          <Menu.Item key={"condition"} color="blue">
            <Icon fitted name="heartbeat" color="red" size={isBrowser || isTablet ? "large" : "small"}/>
              {isBrowser || isTablet ? "Condition" : ""}
          </Menu.Item>
        ),
        render: () => (
          <ParentConditionPane
            conditions={conditions}
            childResource={childResource}
          />
        )
      },
      {
        menuItem: (
          <Menu.Item key={"carePlan"} color="blue">
            <Icon fitted name="unordered list" color="orange" size={isBrowser || isTablet ? "large" : "small"}/>
              {isBrowser || isTablet ? "Care Plan" : ""}
          </Menu.Item>
        ),
        render: () => (
          <ParentCarePlanPane
            carePlans={carePlans}
            childResource={childResource}
          />
        )
      },
      {
        menuItem: (
          <Menu.Item key={"practitionerInfo"} color="blue">
            <Icon fitted name="doctor" color="violet" size={isBrowser || isTablet ? "large" : "small"}/>
              {isBrowser || isTablet ? "Practitioner Information" : ""}

          </Menu.Item>
        ),
        render: () => (
          <ParentDrPane
            patientPractitioners={patientPractitioners}
            childResource={childResource}
          />
        )
      }
    ];

    return (
      <div>
        <h1 align="center">{childResource.name}'s Information</h1>
        <Tab
          menu={{ fluid: true, vertical: true, tabular: true }}
          panes={panes}
        />
      </div>
    );
  }
}

export default ParentInfo;
