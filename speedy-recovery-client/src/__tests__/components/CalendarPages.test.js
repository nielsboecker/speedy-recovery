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

/* This file tests the CalendarPages component*/

import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import exampleAppointment from "../test_input/internal/ExampleAppointment";
import ParentCalendar from "../../components/secured/calendar/parent/ParentCalendar";
import PatientCalendar from "../../components/secured/calendar/patient/PatientCalendar";
import PractitionerCalendar from "../../components/secured/calendar/practitioner/PractitionerCalendar";
import exampleAppointments from "../test_input/internal/ExampleAppointments";
import BigCalendar from "react-big-calendar";
import moment from "moment";

Enzyme.configure({ adapter: new Adapter() });

moment.locale("en-GB");
const localizer = BigCalendar.momentLocalizer(moment);

it("parentCalendar renders without crashing", () => {
  shallow(<ParentCalendar onChange={jest.fn()} events={exampleAppointment} />);
});

it("patientCalendar renders without crashing", () => {
  shallow(
    <PatientCalendar
      onChange={jest.fn()}
      events={exampleAppointments}
      localizer={localizer}
      updateStatePractitioner={jest.fn()}
      patientPractitioner={[]}
    />
  );
});

it("practitionerCalendar renders without crashing", () => {
  shallow(
    <PractitionerCalendar onChange={jest.fn()} events={exampleAppointment} />
  );
});

it("test modals on calendar", () => {
  shallow(<ParentCalendar onChange={jest.fn()} events={exampleAppointment} />);
});

it("can access BigCalendar instance for patient", () => {
  const wrapper = mount(
    <PatientCalendar
      onChange={jest.fn()}
      events={exampleAppointments}
      localizer={localizer}
      updateStatePractitioner={jest.fn()}
      patientPractitioner={[]}
    />
  );
  const { bigCalendarRef } = wrapper.instance();
  expect(bigCalendarRef).toBeDefined();
});

it("can access BigCalendar instance for practitioner", () => {
  const wrapper = mount(
    <PractitionerCalendar
      onChange={jest.fn()}
      events={exampleAppointments}
      localizer={localizer}
    />
  );
  const { bigCalendarRef } = wrapper.instance();
  expect(bigCalendarRef).toBeDefined();
});

it("can access BigCalendar instance for parent", () => {
  const wrapper = mount(
    <ParentCalendar
      onChange={jest.fn()}
      events={exampleAppointments}
      localizer={localizer}
    />
  );
  const { bigCalendarRef } = wrapper.instance();
  expect(bigCalendarRef).toBeDefined();
});
