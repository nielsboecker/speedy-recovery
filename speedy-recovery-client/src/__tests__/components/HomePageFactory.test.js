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

/* This file tests the HomePageFactory component*/

import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import HomePageFactory from "../../components/secured/home/HomePageFactory";
import PatientHomePage from "../../components/secured/home/PatientHomePage";
import ParentHomePage from "../../components/secured/home/ParentHomePage";
import PractitionerHomePage from "../../components/secured/home/PractitionerHomePage";

Enzyme.configure({ adapter: new Adapter() });

test("HomePageFactory renders without crashing", () => {
  mount(
    <HomePageFactory user={{ role: "patient" }} patient={{}} events={[]} />
  );
});

test("HomePageFactory renders patient's home page for patient users", () => {
  const wrapper = mount(
    <HomePageFactory user={{ role: "patient" }} patient={{}} events={[]} />
  );
  expect(wrapper.children().length).toBe(1);
  expect(wrapper.children().type().name).toEqual("PatientHomePage");
});

test("HomePageFactory renders parent's home page for parent users", () => {
  const wrapper = mount(
    <HomePageFactory user={{ role: "parent" }} patient={{}} events={[]} />
  );
  expect(wrapper.children().length).toBe(1);
  expect(wrapper.children().type().name).toEqual("ParentHomePage");
});

test("HomePageFactory renders practitioner's home page for practitioner users", () => {
  const wrapper = mount(
    <HomePageFactory user={{ role: "practitioner" }} patient={{}} events={[]} />
  );
  expect(wrapper.children().length).toBe(1);
  expect(wrapper.children().type().name).toEqual("PractitionerHomePage");
});
