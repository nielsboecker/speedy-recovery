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

/* This file defines the PractitionerInfo component which creates a list of related patients for the practitioner, once
user click one of the patient, it will jump to the patient's detail page
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List, Image } from "semantic-ui-react";

class PractitionerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: []
    };
  }

  render() {
    const patientItems = this.state.patients.map(patient => {
      return (
        <List.Item
          as={Link}
          to={{
            pathname: `/secured/information/${patient.id}`,
            state: {
              patient: patient,
              fhirVersion: this.props.fhirVersion
            }
          }}
          key={patient.id}
        >
          <Image
            avatar
            src="https://institutogoldenprana.com.br/wp-content/uploads/2015/08/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg"
          />
          <List.Content>
            <List.Header>{patient.name}</List.Header>
          </List.Content>
        </List.Item>
      );
    });
    return (
      <div>
        <h1>My patients </h1>
        <List animated verticalAlign="middle" size="big">
          {patientItems}
        </List>
      </div>
    );
  }
  componentWillMount() {
    if (this.props.patients) {
      this.setState({ patients: this.props.patients });
    }
  }
}

export default PractitionerInfo;
