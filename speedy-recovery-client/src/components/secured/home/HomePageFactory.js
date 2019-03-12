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

/* This file defines the HomePageFactory component which, using the abstract factory pattern controls different
homepages being accessed depending on the role of the user.
 */

import React, { Component } from "react";
import PatientHomePage from "./PatientHomePage";
import ParentHomePage from "./ParentHomePage";
import PractitionerHomePage from "./PractitionerHomePage";

class HomePageFactory extends Component {
  render() {
    const { user, events } = this.props;

    switch (user.role.toLowerCase()) {
      case "patient":
        return <PatientHomePage user={user} events={events} />;
      case "parent":
        return <ParentHomePage user={user} events={events} />;
      case "practitioner":
        return <PractitionerHomePage user={user} events={events} />;
      default:
        console.error(`HomePage for user role ${user.role} is invalid`);
        return null;
    }
  }
}

export default HomePageFactory;
