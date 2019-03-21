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
  mapPersonToUserSTU2(mockResource);
});

test("mapAppointmentSTU2(missingResource)", () => {
  const mockResource = {};
  mapAppointmentSTU2(mockResource);
});

test("mapConditionSTU2(missingResource)", () => {
  const mockResource = {};
  mapConditionSTU2(mockResource);
});

test("mapMedicationSTU2(missingResource)", () => {
  const mockResource = { product: { form: "mock" } };
  mapMedicationSTU2(mockResource);
});

test("mapMedicationDispenseSTU2(mockResource)", () => {
  const mockResource = {
    quantity: { value: "mock" },
    daysSupply: { value: "mock" }
  };
  mapMedicationDispenseSTU2(mockResource);
});

test("mapCarePlanSTU2(missingResource)", () => {
  const mockResource = {};
  mapCarePlanSTU2(mockResource);
});

test("mapPractitionerSTU2(missingResource)", () => {
  const mockResource = {};
  mapPractitionerSTU2(mockResource);
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
  getChildIDSTU2(mockResource);
});
