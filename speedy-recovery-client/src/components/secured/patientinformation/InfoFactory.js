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

/* This file defines the InfoFactory component which, using the abstract factory method allows the appropriate patient
information page to be displayed based on the user's role.
 */

import React, { Component } from "react";
import PatientInfo from "./Patient/PatientInfo";
import PractitionerInfo from "./Practitioner/PractitionerInfo";
import ParentInfo from "./Parent/ParentInfo";

class InfoFactory extends Component {
  render() {
    const {
      user,
      childResource,
      conditions,
      medicationDispenses,
      carePlans,
      patientPractitioners
    } = this.props;

    switch (user.role) {
      case "Patient":
        return (
          <PatientInfo
            user={user}
            conditions={conditions}
            medicationDispenses={medicationDispenses}
            carePlans={carePlans}
            patientPractitioners={patientPractitioners}
          />
        );
      case "Parent":
        return (
          <ParentInfo
            childResource={childResource}
            conditions={conditions}
            medicationDispenses={medicationDispenses}
            carePlans={carePlans}
            patientPractitioners={patientPractitioners}
          />
        );
      case "Practitioner":
        return (
          <PractitionerInfo
            patients={this.props.patients}
            fhirVersion={this.props.fhirVersion}
          />
        );
      default:
        return undefined;
    }
  }
}

export default InfoFactory;
