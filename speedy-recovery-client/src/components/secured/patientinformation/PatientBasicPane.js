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

/* This file defines the PatientBasicPane which creates a pane used in the PatientInfo component which displays basic
information about the patient
 */

import React, { Component } from "react";
import { Icon, Tab } from "semantic-ui-react";
import "./PatientInfo.css";

class PatientBasicPane extends Component {
  render() {
    const { user } = this.props;

    const showGenderText = () => {
      let genderStr = "";
      const gender = user.gender;
      if (gender === "female") {
        genderStr = "Girl";
      } else if (gender === "male") {
        genderStr = "Boy";
      } else {
        genderStr = gender;
      }
      return genderStr;
    };

    const showGenderIcon = () => {
      let genderIcon = <Icon fitted name="smile outline" />;
      const gender = user.gender;
      if (gender === "female") {
        genderIcon = <Icon color="pink" fitted name="woman" />;
      } else if (gender === "male") {
        genderIcon = <Icon color="blue" fitted name="man" />;
      }
      return genderIcon;
    };

    return (
      <div>
        <Tab.Pane>
          <h4>Name: {user.name}</h4>
          <h4>
            Gender: {showGenderText()}
            {showGenderIcon()}
          </h4>
          <h4>
            Birthday: {user.birthDate} <Icon fitted name="birthday" />
          </h4>
        </Tab.Pane>
      </div>
    );
  }
}

export default PatientBasicPane;
