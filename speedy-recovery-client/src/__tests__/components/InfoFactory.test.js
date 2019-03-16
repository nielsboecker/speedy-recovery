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

/* This file tests the InfoFactory component*/

import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import InfoFactory from "../../components/secured/patientinformation/InfoFactory";
import PatientInfo from "../../components/secured/patientinformation/PatientInfo";
import ParentInfo from "../../components/secured/patientinformation/ParentInfo";
import PractitionerInfo from "../../components/secured/patientinformation/PractitionerInfo";

Enzyme.configure({ adapter: new Adapter() });

// Note: For a component like this, we should use mount() instead of shallow(), as all
// interesting things happen in the child components

test("InfoFactory renders without crashing", () => {
  mount(
    <InfoFactory
      user={{ role: "Patient" }}
      patient={{}}
      conditions={[]}
      medicationDispenses={[]}
      carePlans={[]}
    />
  );
});

test("InfoFactory renders patient info for patient users", () => {
  const wrapper = mount(
    <InfoFactory
      user={{ role: "Patient" }}
      patient={{}}
      conditions={[]}
      medicationDispenses={[]}
      carePlans={[]}
    />
  );
  expect(wrapper.children().length).toBe(1);
  expect(wrapper.children().type().name).toEqual("PatientInfo");
});

test("InfoFactory renders parent info for parent users", () => {
  const wrapper = mount(<InfoFactory user={{ role: "Parent" }} patient={{}} />);
  expect(wrapper.children().length).toBe(1);
  expect(wrapper.children().type().name).toEqual("ParentInfo");
});

test("InfoFactory renders practitioner info for practitioner users", () => {
  const wrapper = mount(
    <InfoFactory user={{ role: "Practitioner" }} patient={{}} />
  );
  expect(wrapper.children().length).toBe(1);
  expect(wrapper.children().type().name).toEqual("PractitionerInfo");
});
