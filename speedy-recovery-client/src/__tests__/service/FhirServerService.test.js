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

/* This file tests the discovery of Capability Statements ensuring that valid FHIR versions are present on the server*/

import FetchMock from "jest-fetch-mock";
import FhirServerService from "../../service/FhirServerService";
import CapabilityStatement_STU3_allResourcesAvailable from "../test_input/fhir_server/FhirExampleCapabilityStatement_STU3_allResourcesAvailable.json";
import CapabilityStatement_STU3_PatientResourceMissing from "../test_input/fhir_server/FhirExampleCapabilityStatement_STU3_PatientResourceMissing.json";
import CapabilityStatement_STU2_allResourcesAvailable from "../test_input/fhir_server/FhirExampleCapabilityStatement_STU2_allResourcesAvailable.json";
import CapabilityStatement_wrongFhirVersion from "../test_input/fhir_server/FhirExampleCapabilityStatement_wrongFhirVersion";

// Mock fetch()
global.fetch = FetchMock;

beforeEach(() => {
  fetch.resetMocks();
});

test("success when FHIR server is STU3 (3.0.1)", async () => {
  fetch.mockResponseOnce(
    JSON.stringify(CapabilityStatement_STU3_allResourcesAvailable)
  );

  await expect(
    FhirServerService.checkFhirCapabilityStatement()
  ).resolves.toEqual(CapabilityStatement_STU3_allResourcesAvailable);
  expect(fetch.mock.calls.length).toEqual(1);
});

test("success when FHIR server is DSTU2 (1.0.2)", async () => {
  fetch.mockResponseOnce(
    JSON.stringify(CapabilityStatement_STU2_allResourcesAvailable)
  );

  await expect(
    FhirServerService.checkFhirCapabilityStatement()
  ).resolves.toEqual(CapabilityStatement_STU2_allResourcesAvailable);
  expect(fetch.mock.calls.length).toEqual(1);
});

test("failure when FHIR server lacks support for required resources", async () => {
  fetch.mockResponseOnce(
    JSON.stringify(CapabilityStatement_STU3_PatientResourceMissing)
  );

  await expect(
    FhirServerService.checkFhirCapabilityStatement()
  ).rejects.toEqual("FHIR server requirements not met");
  expect(fetch.mock.calls.length).toEqual(1);
});

test("failure when FHIR server supports wrong version of FHIR standard", async () => {
  fetch.mockResponseOnce(JSON.stringify(CapabilityStatement_wrongFhirVersion));

  await expect(
    FhirServerService.checkFhirCapabilityStatement()
  ).rejects.toEqual("FHIR server requirements not met");
  expect(fetch.mock.calls.length).toEqual(1);
});

test("failure when FHIR server doesn't reply with a valid CapabilityStatement", async () => {
  fetch.mockResponseOnce(42);

  await expect(
    FhirServerService.checkFhirCapabilityStatement()
  ).rejects.toEqual("FHIR server requirements not met");
  expect(fetch.mock.calls.length).toEqual(1);
});

test("failure when FHIR server does not respond (fetch CapabilityStatement fails)", async () => {
  fetch.mockReject(new Error("Fake error message"));

  await expect(
    FhirServerService.checkFhirCapabilityStatement()
  ).rejects.toEqual("FHIR server not responding");
  expect(fetch.mock.calls.length).toEqual(1);
});
