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

/* This file defines the CalendarFactory component which is the 'Abstract class' used as part of the abstract factory
method, distinguishing between the types of calendar to show the user based on their role.
 */

import * as React from "react";
import PractitionerCalendar from "./practitioner/PractitionerCalendar";
import PatientCalendar from "./patient/PatientCalendar";
import ParentCalendar from "./parent/ParentCalendar";
import BigCalendar from "react-big-calendar";
import moment from "moment";

moment.locale("en-GB");
const localizer = BigCalendar.momentLocalizer(moment);

class CalendarFactory extends React.Component {
  render() {
    switch (this.props.role) {
      case "Patient":
        return (
          <PatientCalendar
            events={this.props.events}
            localizer={localizer}
            fhirVersion={this.props.fhirVersion}
            patientPractitioners={this.props.patientPractitioners}
          />
        );
      case "Parent":
        return (
          <ParentCalendar
            events={this.props.events}
            id={this.props.childID}
            localizer={localizer}
          />
        );
      case "Practitioner":
        return (
          <PractitionerCalendar
            events={this.props.events}
            id={this.props.id}
            localizer={localizer}
          />
        );
      default:
        console.error(
          `Cannot render calendar for user role "${this.props.role}"`
        );
        return null;
    }
  }
}

export default CalendarFactory;
