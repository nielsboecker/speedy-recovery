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

/* This file tests the CalendarFactory component*/

import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CalendarFactory from "../../components/secured/calendar/CalendarFactory";
import ParentCalendar from "../../components/secured/calendar/parent/ParentCalendar";
import PatientCalendar from "../../components/secured/calendar/patient/PatientCalendar";
import PractitionerCalendar from "../../components/secured/calendar/practitioner/PractitionerCalendar";

Enzyme.configure({ adapter: new Adapter() });

// Note: For a component like this, we should use mount() instead of shallow(), as all
// interesting things happen in the child components

test("CalendarFactory renders without crashing", () => {
  mount(<CalendarFactory onChange={jest.fn()} events={[]} role="Patient" />);
});

test("CalendarFactory renders patient calendar for patient users", () => {
  const wrapper = mount(
    <CalendarFactory onChange={jest.fn()} events={[]} role="Patient" />
  );
  expect(wrapper.children().length).toBe(1);
  expect(wrapper.children().type().name).toEqual("PatientCalendar");
});

test("CalendarFactory renders parent calendar for parent users", () => {
  const wrapper = mount(
    <CalendarFactory onChange={jest.fn()} events={[]} role="Parent" />
  );
  expect(wrapper.children().length).toBe(1);
  expect(wrapper.children().type().name).toEqual("ParentCalendar");
});

test("CalendarFactory renders practitioner calendar for practitioner users", () => {
  const wrapper = mount(
    <CalendarFactory onChange={jest.fn()} events={[]} role="Practitioner" />
  );
  expect(wrapper.children().length).toBe(1);
  expect(wrapper.children().type().name).toEqual("PractitionerCalendar");
});
