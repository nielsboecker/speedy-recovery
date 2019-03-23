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
  const result = mapPersonToUserSTU3(mockResource);
  const expected = {
    address: "Unknown",
    birthDate: "Unknown",
    careProvider: "Unknown",
    email: "Unknown",
    firstName: "Unknown",
    gender: "Unknown",
    id: "Unknown",
    name: "Unknown",
    phone: "Unknown",
    role: undefined
  };
  expect(result).toEqual(expected);
});

test("mapAppointmentSTU3(missingResource)", () => {
  const mockResource = {};
  const result = mapAppointmentSTU3(mockResource);
  const expected = {
    appType: "Unknown",
    comment: "Unknown",
    created: "Unknown",
    description: "Unknown",
    end: "Unknown",
    id: "Unknown",
    indication: "Unknown",
    location: "Unknown",
    patient: "Unknown",
    patientId: "Unknown",
    practitioner: "Unknown",
    practitionerId: "Unknown",
    priority: "Unknown",
    start: "Unknown",
    status: "Unknown",
    supportingInfo: "Unknown",
    title: "Unknown"
  };
  expect(result).toEqual(expected);
});

test("mapConditionSTU3(missingResource)", () => {
  const mockResource = {};
  const result = mapConditionSTU3(mockResource);
  const expected = {
    bodySite: "Unknown",
    clinicalStatus: "Unknown",
    onsetDateTime: "Unknown",
    severity: "Unknown",
    summary: "Unknown",
    verificationStatus: "Unknown"
  };
  expect(result).toEqual(expected);
});

test("mapMedicationSTU3()", () => {
  const mockResource = { product: { form: "mock" } };
  const result = mapMedicationSTU3(mockResource);
  const expected = {
    content: "Unknown",
    form: "Unknown",
    id: "Unknown",
    imageURL: "Unknown",
    isBrand: "Unknown",
    isOverTheCounter: "Unknown",
    name: "Unknown",
    producer: "Unknown"
  };
  expect(result).toEqual(expected);
});

test("mapMedicationDispenseSTU3()", () => {
  const mockResource = { quantity: { value: "mock" }, daysSupply: "mock" };
  const result = mapMedicationDispenseSTU3(mockResource);
  const expected = {
    daysSupply: "Unknown",
    dosageFrequency: undefined,
    dosagePeriod: undefined,
    id: "Unknown",
    intakeMethod: undefined,
    name: "Unknown",
    quantity: "mock",
    status: "Unknown",
    whenHandedOver: "Unknown"
  };
  expect(result).toEqual(expected);
});

test("mapCarePlanSTU3(missingResource)", () => {
  const mockResource = {};
  const result = mapCarePlanSTU3(mockResource);
  const expected = {
    activities: "Unknown",
    category: "Unknown",
    id: "Unknown",
    period: "Unknown",
    status: "Unknown"
  };
  expect(result).toEqual(expected);
});

test("mapPractitionerSTU3(missingResource)", () => {
  const mockResource = {};
  const result = mapPractitionerSTU3(mockResource);
  const expected = {
    birthDate: "Unknown",
    email: "Unknown",
    gender: "Unknown",
    id: "Unknown",
    name: "Unknown",
    phone: "Unknown",
    photo: "Unknown"
  };
  expect(result).toEqual(expected);
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

test("getCarePlanEnd(mockResource)", () => {
  const mockEnd = "mock";
  const end = getCarePlanEnd({ end: mockEnd });
  expect(end).toEqual(mockEnd);
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
  const id = getChildIDSTU3(mockResource);
  expect(id).toEqual(undefined);
});

test("getChildIDSTU3(mockResource)", () => {
  const mockResource = { link: [{ other: { reference: "mock/10086" } }] };
  const id = getChildIDSTU3(mockResource);
  expect(id).toEqual("10086");
});
