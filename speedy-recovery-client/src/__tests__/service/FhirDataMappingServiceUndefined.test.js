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

/* This file tests the mapping from FHIR undefined resources*/

import {
  fhirMapAppointment,
  fhirMapCondition,
  fhirMapMedication,
  fhirMapMedicationDispense,
  fhirMapCarePlan,
  fhirMapPractitioner,
  fhirMapPatient,
  getChildID
} from "../../service/FhirDataMappingService";
import fhirExamplePatient from "../test_input/fhir_resources_stu3/FhirExamplePatientSTU3.json";
import fhirShortApp from "../test_input/fhir_resources_stu3/FhirSingleExampleAppointmentSTU3.json";
import fhirExampleCondition from "../test_input/fhir_resources_stu3/FhirExampleConditionSTU3.json";
import fhirExampleMedication from "../test_input/fhir_resources_stu3/FhirExampleMedicationSTU3.json";
import fhirExampleCarePlan from "../test_input/fhir_resources_stu3/FhirExampleCarePlanSTU3.json";
import fhirExampleMedicationDispense from "../test_input/fhir_resources_stu3/FhirExampleMedicationDispenseSTU3.json";
import fhirExamplePractitioner from "../test_input/fhir_resources_stu3/FhirExamplePractitionerSTU3.json";

test("map FHIR Patient resource version 0 return null", () => {
  const user = fhirMapPatient(fhirExamplePatient, "0");
  expect(user).toEqual(null);
});

test("map FHIR Appointment resource version 0 return null", () => {
  const appointment = fhirMapAppointment(fhirShortApp, "0");
  expect(appointment).toEqual(null);
});

test("map FHIR Condition resource version 0 return null", () => {
  const condition = fhirMapCondition(fhirExampleCondition, "0");
  expect(condition).toEqual(null);
});

test("map FHIR Medication resource version 0 return null", () => {
  const medication = fhirMapMedication(fhirExampleMedication, "0");
  expect(medication).toEqual(null);
});

test("map FHIR CarePlan resource version 0 return null", () => {
  const carePlan = fhirMapCarePlan(fhirExampleCarePlan, "0");
  expect(carePlan).toEqual(null);
});

test("map FHIR MedicationDispense resource version 0 return null", () => {
  const medicationDispense = fhirMapMedicationDispense(
    fhirExampleMedicationDispense,
    "0"
  );
  expect(medicationDispense).toEqual(null);
});

test("map FHIR Practitioner resource version 0 return null", () => {
  const practitioner = fhirMapPractitioner(fhirExamplePractitioner, "0");
  expect(practitioner).toEqual(null);
});

test("getChildID version 0 return null", () => {
  const id = getChildID(fhirExamplePatient, "0");
  expect(id).toEqual(null);
});

test("map FHIR Patient resource version 1 return null", () => {
  const user = fhirMapPatient(fhirExamplePatient, "1");
  expect(user).toEqual(null);
});

test("map FHIR Appointment resource version 1 return null", () => {
  const appointment = fhirMapAppointment(fhirShortApp, "1");
  expect(appointment).toEqual(null);
});

test("map FHIR Condition resource version 1 return null", () => {
  const condition = fhirMapCondition(fhirExampleCondition, "1");
  expect(condition).toEqual(null);
});

test("map FHIR Medication resource version 1 return null", () => {
  const medication = fhirMapMedication(fhirExampleMedication, "1");
  expect(medication).toEqual(null);
});

test("map FHIR CarePlan resource version 1 return null", () => {
  const carePlan = fhirMapCarePlan(fhirExampleCarePlan, "1");
  expect(carePlan).toEqual(null);
});

test("map FHIR MedicationDispense resource version 1 return null", () => {
  const medicationDispense = fhirMapMedicationDispense(
    fhirExampleMedicationDispense,
    "1"
  );
  expect(medicationDispense).toEqual(null);
});

test("map FHIR Practitioner resource version 1 return null", () => {
  const practitioner = fhirMapPractitioner(fhirExamplePractitioner, "1");
  expect(practitioner).toEqual(null);
});

test("getChildID version 1 return null", () => {
  const id = getChildID(fhirExamplePatient, "1");
  expect(id).toEqual(null);
});
