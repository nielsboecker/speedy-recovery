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

/* This file tests the authentication session that is started when a user logs in*/

import "jest-localstorage-mock";
import SmartAuthService from "../../service/SmartAuthService";

test("start smart authenticated session", () => {
  // Mock SMART on FHIR auth
  const mockFhirAuthCall = jest.fn();
  global.FHIR.oauth2.authorize = mockFhirAuthCall;

  SmartAuthService.startSmartAuthenticatedSession("Practitioner");

  expect(mockFhirAuthCall.mock.calls.length).toBe(1);
  const configParam = mockFhirAuthCall.mock.calls[0][0]; // First param of first function call
  expect(configParam).toHaveProperty("client");
  expect(configParam).toHaveProperty("server");
});

test("on start authetication session callback is registered", () => {
  expect(SmartAuthService.onSmartAuthenticatedSessionReady).toBeInstanceOf(
    Function
  );
});

test("end smart authenticated session", () => {
  // given
  sessionStorage.tokenResponse = "foo";
  expect(sessionStorage).toHaveProperty("tokenResponse");

  // when
  SmartAuthService.endSmartAuthenticatedSession();

  // then
  expect(sessionStorage.clear).toHaveBeenCalled();
  expect(sessionStorage).toEqual({});
});
