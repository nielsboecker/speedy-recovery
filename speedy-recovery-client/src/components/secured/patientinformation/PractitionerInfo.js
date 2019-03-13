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

/* This file defines the PractitionerInfo component which creates an information page containing detailed information
about each of the practitioners' patients.
 */

import React, { Component } from "react";

class PractitionerInfo extends Component {
  render() {
    const { patient } = this.props;

    return (
      <div>
        <h1>Patient Information For Practitioner View</h1>
        <h4>Name: {patient.name}</h4>
        <h4>Gender: {patient.gender}</h4>
        <h4>Address: {patient.address}</h4>
        <h4>Email: {patient.email}</h4>
      </div>
    );
  }
}

export default PractitionerInfo;
