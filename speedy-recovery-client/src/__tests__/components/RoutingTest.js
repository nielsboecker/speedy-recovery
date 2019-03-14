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

/* This file tests whether the user is routed to the correct components after login*/

import React from "react";
import "jest-localstorage-mock";
import App from "../../components/core/App";
import ErrorPage from "../../components/error/ErrorPage";
import SecuredMainPage from "../../components/secured/core/SecuredMainPage";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router-dom";
import LandingMainPage from "../../components/landing/core/LandingMainPage";

Enzyme.configure({ adapter: new Adapter() });

// Mock BrowserRouter
jest.mock("react-router-dom/BrowserRouter", () => {
  return ({ children }) => <div>{children}</div>;
});

test("show error page for invalid URL", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/foobar"]}>
      <App />
    </MemoryRouter>
  );
  // console.log(wrapper.debug());
  expect(wrapper.find(ErrorPage)).toHaveLength(1);
  expect(wrapper.find(LandingMainPage)).toHaveLength(0);
  expect(wrapper.find(SecuredMainPage)).toHaveLength(0);
});

// TODO: Could add more, like e.g. /conversations/2 actually shows conversation #2
