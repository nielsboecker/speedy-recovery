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

/* This file tests the functions in FhirMappingAdapterDSTU2*/
import {
  mapPersonToUserSTU2,
  mapAppointmentSTU2,
  mapConditionSTU2,
  mapMedicationSTU2,
  mapMedicationDispenseSTU2,
  mapCarePlanSTU2,
  mapPractitionerSTU2,
  getCarePlanActivities,
  getCarePlanStart,
  getCarePlanEnd,
  getChildIDSTU2,
  formatBirthDate
} from "../../service/FhirMappingAdapterDSTU2";

const missingField = "Unknown";

test("mapPersonToUserSTU2(missingResource)", () => {
  const mockResource = {};
  const result = mapPersonToUserSTU2(mockResource);
  const expected = {
    address: "Unknown",
    birthDate: "Unknown",
    careProvider: "Undefined in STU2",
    email: "Undefined in STU2",
    firstName: "Unknown",
    gender: "Unknown",
    id: "Unknown",
    name: "Unknown",
    phone: "Unknown",
    role: undefined
  };
  expect(result).toEqual(expected);
});

test("mapAppointmentSTU2(missingResource)", () => {
  const mockResource = {};
  const result = mapAppointmentSTU2(mockResource);
  const expected = {
    appType: "Undefined in STU2",
    comment: "Unknown",
    created: "Undefined in STU2",
    description: "Unknown",
    end: "Unknown",
    id: "Unknown",
    indication: "Undefined in STU2",
    location: "Unknown",
    patient: "Unknown",
    patientId: "Unknown",
    practitioner: "Unknown",
    practitionerId: "Unknown",
    priority: "Unknown",
    start: "Unknown",
    status: "Unknown",
    supportingInfo: "Undefined in STU2",
    title: "Unknown"
  };
  expect(result).toEqual(expected);
});

test("mapConditionSTU2(missingResource)", () => {
  const mockResource = {};
  const result = mapConditionSTU2(mockResource);
  const expected = {
    bodySite: "Unknown",
    clinicalStatus: "Undefined in STU2",
    onsetDateTime: "Unknown",
    severity: "Unknown",
    summary: "Unknown",
    verificationStatus: "Unknown"
  };
  expect(result).toEqual(expected);
});

test("mapMedicationSTU2(missingResource)", () => {
  const mockResource = { product: { form: "mock" } };
  const result = mapMedicationSTU2(mockResource);
  const expected = {
    content: "Undefined in STU2",
    form: "Unknown",
    id: "Unknown",
    imageURL: "Undefined in STU2",
    isBrand: "Unknown",
    isOverTheCounter: "Undefined in STU2",
    name: "Unknown",
    producer: "Undefined in STU2"
  };
  expect(result).toEqual(expected);
});

test("mapMedicationDispenseSTU2(mockResource)", () => {
  const mockResource = {
    quantity: { value: "mock" },
    daysSupply: { value: "mock" }
  };
  const result = mapMedicationDispenseSTU2(mockResource);
  const expected = {
    daysSupply: "mock",
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

test("mapCarePlanSTU2(missingResource)", () => {
  const mockResource = {};
  const result = mapCarePlanSTU2(mockResource);
  const expected = {
    activities: "Unknown",
    category: "Unknown",
    id: "Unknown",
    period: "Unknown",
    status: "Unknown"
  };
  expect(result).toEqual(expected);
});

test("mapPractitionerSTU2(missingResource)", () => {
  const mockResource = {};
  const result = mapPractitionerSTU2(mockResource);
  const expected = {
    birthDate: "Undefined in STU2",
    gender: "Undefined in STU2",
    id: "Unknown",
    name: "Unknown",
    phone: "Unknown",
    photo: "Undefined in STU2"
  };
  expect(result).toEqual(expected);
});

test("getCarePlanActivities(missingResource)", () => {
  const act = getCarePlanActivities();
  expect(act).toEqual(missingField);
});

test("getCarePlanStart(missingResource)", () => {
  const start = getCarePlanStart();
  expect(start).toEqual(missingField);
});

test("getCarePlanEnd(missingResource)", () => {
  const end = getCarePlanEnd();
  expect(end).toEqual(missingField);
});

test("formatBirthDate(missingResource)", () => {
  const birthDate = formatBirthDate();
  expect(birthDate).toEqual(missingField);
});

test("getChildIDSTU2(mockResource)", () => {
  const mockResource = { link: [{ other: { reference: "mock" } }] };
  const id = getChildIDSTU2(mockResource);
  expect(id).toEqual(undefined);
});

test("getChildIDSTU2(mockResource)", () => {
  const mockResource = { link: [{ other: { reference: "mock/10086" } }] };
  const id = getChildIDSTU2(mockResource);
  expect(id).toEqual("10086");
});
