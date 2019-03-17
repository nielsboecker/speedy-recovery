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

/* This file defines the ParentDrPane which creates a pane used in the ParentInfo component which displays information
 * about the practitioner taking care of the Parent's child.  
 */

import React, { Component } from "react";
import { Tab } from "semantic-ui-react";

class ParentDrPane extends Component {
  render() {
    const { childResource } = this.props;

      return (
      <div>
        <Tab.Pane color="blue">
          <h4>TODO</h4>
          <h4>{childResource.name}'s practitioner info </h4>
        </Tab.Pane>
      </div>
    );
  }
}

export default ParentDrPane;
