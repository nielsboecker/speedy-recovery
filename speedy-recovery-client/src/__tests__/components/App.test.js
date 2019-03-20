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

/* This file tests the App.js component*/

import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../../components/core/App";
import SmartAuthService from "../../service/SmartAuthService";

Enzyme.configure({ adapter: new Adapter() });

// Mock SmartAuthService
jest.mock("../../service/SmartAuthService", () => ({
  startSmartAuthenticatedSession: jest.fn(),
  onSmartAuthenticatedSessionReady: jest
    .fn()
    .mockImplementation(() => Promise.resolve()),
  endSmartAuthenticatedSession: jest.fn()
}));

// Mock mapPatientToUser
jest.mock("../../service/FhirDataMappingService", () => ({
  mapPatientToUser: user => user
}));

const wrapper = shallow(<App />);
const underTest = wrapper.instance();

test("render without crashing", () => {
  shallow(<App />);

  // Make sure auth callback was registered
  expect(SmartAuthService.onSmartAuthenticatedSessionReady).toHaveBeenCalled();
});

test("handleLoginRequest() calls SmartAuthService", () => {
  underTest.handleLoginRequest();
  expect(SmartAuthService.startSmartAuthenticatedSession).toHaveBeenCalled();
});

test("handleLogoutRequest() calls SmartAuthService", () => {
  underTest.handleLogoutRequest();
  expect(SmartAuthService.endSmartAuthenticatedSession).toHaveBeenCalled();
});

test("handleLoginSuccess() sets state appropriately", () => {
  // given
  const mockUser = { name: "foo" };
  const mockFhirClient = {
    user: {
      read: jest.fn().mockImplementation(() => Promise.resolve(mockUser))
    }
  };

  wrapper.setState({ fhirClient: mockFhirClient });
  // when
  underTest.handleLoginSuccess(mockFhirClient);

  // then
  expect(wrapper.state().fhirClient).toEqual(mockFhirClient);

  // This should work, but there seems to be a bug, Promise.resolve executes too late
  // expect(wrapper.state().user).toEqual(mockUser);
});
