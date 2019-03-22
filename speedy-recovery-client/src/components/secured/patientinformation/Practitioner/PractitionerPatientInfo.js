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
import FhirDataQueryingService from "../../../../service/FhirDataQueryingService";
import { Icon, Menu, Tab } from "semantic-ui-react";
import "./PractitionerInfo.css";
import PractitionerConditionPane from "./PractitionerConditionPane";
import PractitionerCarePlanPane from "./PractitionerCarePlanPane";
import PractitionerMedicationPane from "./PractitionerMedicationPane";
import PractitionerBasicPane from "./PractitionerBasicPane";
import PractitionerFamilyHistoryPane from "./PractitionerFamilyHistoryPane";
import PractitionerGoalPane from "./PractitionerGoalPane";
import {
  fhirMapCarePlan,
  fhirMapCondition,
  fhirMapMedicationDispense,
  fhirMapFamilyResource,
  fhirMapGoal
} from "../../../../service/FhirDataMappingService";
import {isBrowser, isTablet} from 'react-device-detect';


class PractitionerPatientInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: {},
      conditions: [],
      medicationDispenses: [],
      carePlans: [],
      familyHistories: [],
      goal: []
    };
  }

  render() {
    const panes = [
      {
        menuItem: (
          <Menu.Item key={"basic"}>
            <Icon fitted name="id card outline" color="blue" size={isBrowser || isTablet ? "large" : "small"} />
              {isTablet || isBrowser ? "Basic" : ""}
          </Menu.Item>
        ),

        render: () => (
          <PractitionerBasicPane patient={this.props.location.state.patient} />
        )
      },
      {
        menuItem: (
          <Menu.Item key={"medication"}>
            <Icon fitted name="pills" color="purple" size={isBrowser || isTablet ? "large" : "small"} />
              {isTablet || isBrowser ? "Dispensed Medication" : ""}
          </Menu.Item>
        ),
        render: () => (
          <PractitionerMedicationPane
            medicationDispenses={this.state.medicationDispenses}
          />
        )
      },
      {
        menuItem: (
          <Menu.Item key={"condition"}>
            <Icon fitted name="heartbeat" color="red" size={isBrowser || isTablet ? "large" : "small"} />
              {isTablet || isBrowser ? "Condition" : ""}
          </Menu.Item>
        ),
        render: () => (
          <PractitionerConditionPane conditions={this.state.conditions} />
        )
      },
      {
        menuItem: (
          <Menu.Item key={"carePlan"}>
            <Icon fitted name="unordered list" color="orange" size={isBrowser || isTablet ? "large" : "small"} />
                {isTablet || isBrowser ? "Care Plan" : ""}
          </Menu.Item>
        ),
        render: () => <PractitionerCarePlanPane carePlans={this.state.carePlans} />
      },

      {
        menuItem: (
          <Menu.Item key={"histories"}>
            <Icon fitted name="book" color="green" size={isBrowser || isTablet ? "large" : "small"} />
                {isTablet || isBrowser ? "Family History" : ""}
          </Menu.Item>
        ),
        render: () => (
          <PractitionerFamilyHistoryPane familyHistories={this.state.familyHistories } />
        )
      },

      {
        menuItem: (
          <Menu.Item key={"goal"}>
            <Icon fitted name="trophy" color="yellow" size={isBrowser || isTablet ? "large" : "small"} />
                {isTablet || isBrowser ? "Goal" : ""}
          </Menu.Item>
        ),

        render: () => <PractitionerGoalPane goal={this.state.goal} />
      }
    ];

    return (
      <div>
        <h1> Information For  {this.props.location.state.patient.name}</h1>
        <Tab
          menu={{ fluid: true, vertical: true, tabular: true }}
          panes={panes}
        />
      </div>
    );
  }

  componentWillMount() {
    if (this.props.location) {
      this.updateStateCondition(this.props.location.state.patient.id);
      this.updateStateMedicationDispense(this.props.location.state.patient.id);
      this.updateStateCarePlan(this.props.location.state.patient.id);
      this.updateStateFamilyHistory(this.props.location.state.patient.id);
      this.updateGoal(this.props.location.state.patient.id);
    }
  }

  //TODO: Move these to App.js
  updateGoal(userId) {
    FhirDataQueryingService.getGoal(userId)
      .then(GoalResource => {
        const goal = GoalResource.map(goal =>
          fhirMapGoal(goal, this.props.location.state.fhirVersion)
        );
        this.setState({ goal });
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateStateFamilyHistory(userId) {
    FhirDataQueryingService.getFamilyMemberHistory(userId)
      .then(familyResource => {
        const familyHistories = familyResource.map(history =>
          fhirMapFamilyResource(history, this.props.location.state.fhirVersion)
        );
        this.setState({ familyHistories });
      })
      .catch(error => {
        console.error(error);
      });
  }
  updateStateCondition(userId) {
    FhirDataQueryingService.getUserConditions(userId)
      .then(conditionResource => {
        const conditions = conditionResource.map(condition =>
          fhirMapCondition(condition, this.props.location.state.fhirVersion)
        );
        this.setState({ conditions });
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateStateMedicationDispense(userId) {
    FhirDataQueryingService.getUserMedicationDispense(userId)
      .then(medicationResource => {
        const medicationDispenses = medicationResource.map(medication =>
          fhirMapMedicationDispense(
            medication,
            this.props.location.state.fhirVersion
          )
        );
        this.setState({ medicationDispenses });
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateStateCarePlan(userId) {
    FhirDataQueryingService.getUserCarePlan(userId)
      .then(carePlanResource => {
        const carePlans = carePlanResource.map(carePlan =>
          fhirMapCarePlan(carePlan, this.props.location.state.fhirVersion)
        );
        this.setState({ carePlans });
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export default PractitionerPatientInfo;
