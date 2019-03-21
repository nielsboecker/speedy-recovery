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

/* This file tests the functions in FhirMappingAdapterSTU3*/
import {
  mapPersonToUserSTU3,
  mapAppointmentSTU3,
  mapConditionSTU3,
  mapMedicationSTU3,
  mapMedicationDispenseSTU3,
  mapCarePlanSTU3,
  mapPractitionerSTU3,
  getCarePlanStart,
  getCarePlanEnd,
  getPhoto,
  formatBirthDate,
  getChildIDSTU3
} from "../../service/FhirMappingAdapterSTU3";

const missingField = "Unknown";

test("mapPersonToUserSTU3(missingResource)", () => {
  const mockResource = {};
  mapPersonToUserSTU3(mockResource);
});

test("mapAppointmentSTU3(missingResource)", () => {
  const mockResource = {};
  mapAppointmentSTU3(mockResource);
});

test("mapConditionSTU3(missingResource)", () => {
  const mockResource = {};
  mapConditionSTU3(mockResource);
});

test("mapMedicationSTU3()", () => {
  const mockResource = { product: { form: "mock" } };
  mapMedicationSTU3(mockResource);
});

test("mapMedicationDispenseSTU3()", () => {
  const mockResource = { quantity: { value: "mock" }, daysSupply: "mock" };
  mapMedicationDispenseSTU3(mockResource);
});

test("mapCarePlanSTU3(missingResource)", () => {
  const mockResource = {};
  mapCarePlanSTU3(mockResource);
});

test("mapPractitionerSTU3(missingResource)", () => {
  const mockResource = {};
  mapPractitionerSTU3(mockResource);
});

test("getCarePlanStart(mockResource)", () => {
  const mockStart = "mock";
  const start = getCarePlanStart({ start: mockStart });
  expect(start).toEqual(mockStart);
});

test("getCarePlanStart(missingResource)", () => {
  const start = getCarePlanStart();
  expect(start).toEqual(missingField);
});

test("getCarePlanEnd(missingResource)", () => {
  const end = getCarePlanEnd();
  expect(end).toEqual(missingField);
});

test("getPhoto(mockResource)", () => {
  const mockData = "mock";
  const mockResource = [{ data: mockData }, { data: "other" }];
  expect(getPhoto(mockResource)).toEqual(mockData);
});

test("formatBirthDate(missingResource)", () => {
  const birthDate = formatBirthDate();
  expect(birthDate).toEqual(missingField);
});

test("getChildIDSTU3(mockResource)", () => {
  const mockResource = { link: [{ other: { reference: "mock" } }] };
  getChildIDSTU3(mockResource);
});
