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

/* This file tests the functions in FhirDataMappingExtractionUtils*/
import {
  getName,
  getFirstName,
  getPatient,
  getPractitioner,
  getPatientId,
  getPractitionerId,
  getLocation,
  getSeverity,
  getSummary,
  getbodySite,
  getMedName,
  getForm,
  getPractName
} from "../../service/FhirDataMappingExtractionUtils";

const missingField = "Unknown";

test("getName(missingResource)", () => {
  const name = getName();
  expect(name).toEqual(missingField);
});

test("getFirstName(missingResource)", () => {
  const fName = getFirstName();
  expect(fName).toEqual(missingField);
});

test("getPatient(missingResource)", () => {
  const p = getPatient();
  expect(p).toEqual(missingField);
});

test("getPractitioner(missingResource)", () => {
  const p = getPractitioner();
  expect(p).toEqual(missingField);
});

test("getPatientId(missingResource)", () => {
  const pid = getPatientId();
  expect(pid).toEqual(missingField);
});

test("getPractitionerId(missingResource)", () => {
  const pid = getPractitionerId();
  expect(pid).toEqual(missingField);
});

test("getLocation(missingResource)", () => {
  const location = getLocation();
  expect(location).toEqual(missingField);
});

test("getSeverity(missingResource)", () => {
  const sev = getSeverity();
  expect(sev).toEqual(missingField);
});

test("getSummary(missingResource)", () => {
  const sum = getSummary();
  expect(sum).toEqual(missingField);
});

test("getbodySite(missingResource)", () => {
  const bodySite = getbodySite();
  expect(bodySite).toEqual(missingField);
});

test("getMedName(missingResource)", () => {
  const medName = getMedName();
  expect(medName).toEqual(missingField);
});

test("getForm(missingResource)", () => {
  const f = getForm();
  expect(f).toEqual(missingField);
});

test("getPractName(missingResource)", () => {
  const name = getPractName();
  expect(name).toEqual(missingField);
});
