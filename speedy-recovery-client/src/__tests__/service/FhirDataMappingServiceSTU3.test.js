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

/* This file tests the mapping from FHIR STU3 resources to our internal format*/

import {
  fhirMapAppointment,
  fhirMapCarePlan,
  fhirMapCondition,
  fhirMapMedication,
  fhirMapMedicationDispense,
  fhirMapPatient,
  fhirMapPractitioner
} from "../../service/FhirDataMappingService";
import fhirExamplePatient from "../test_input/fhir_resources_stu3/FhirExamplePatientSTU3.json";
import fhirExamplePatientMissingField from "../test_input/fhir_resources_stu3/FhirExamplePatientMissingFieldSTU3.json";
import fhirShortApp from "../test_input/fhir_resources_stu3/FhirSingleExampleAppointmentSTU3.json";
import fhirExampleCondition from "../test_input/fhir_resources_stu3/FhirExampleConditionSTU3.json";
import fhirExampleMedication from "../test_input/fhir_resources_stu3/FhirExampleMedicationSTU3.json";
import fhirExampleCarePlan from "../test_input/fhir_resources_stu3/FhirExampleCarePlanSTU3.json";
import fhirExampleMedicationDispense from "../test_input/fhir_resources_stu3/FhirExampleMedicationDispenseSTU3.json";
import fhirExamplePractitioner from "../test_input/fhir_resources_stu3/FhirExamplePractitionerSTU3.json";

test("map FHIR Patient resource to internal user data model", () => {
  const user = fhirMapPatient(fhirExamplePatient, "3");
  expect(user).toMatchSnapshot();
});

test("map FHIR Patient resource(with missing fields) to internal user data model", () => {
  const user = fhirMapPatient(fhirExamplePatientMissingField, "3");
  expect(user).toMatchSnapshot();
});

test("map FHIR Appointment resource to calendar data model", () => {
  const appointment = fhirMapAppointment(fhirShortApp, "3");
  expect(appointment).toMatchSnapshot();
});

test("map FHIR Condition resource to internal data model", () => {
  const condition = fhirMapCondition(fhirExampleCondition, "3");
  expect(condition).toMatchSnapshot();
});

test("map FHIR Medication resource to internal data model", () => {
  const medication = fhirMapMedication(fhirExampleMedication, "3");
  expect(medication).toMatchSnapshot();
});

test("map FHIR CarePlan resource to internal data model", () => {
  const carePlan = fhirMapCarePlan(fhirExampleCarePlan, "3");
  expect(carePlan).toMatchSnapshot();
});

test("map FHIR MedicationDispense resource to internal data model", () => {
  const medicationDispense = fhirMapMedicationDispense(
    fhirExampleMedicationDispense,
    "3"
  );
  expect(medicationDispense).toMatchSnapshot();
});

test("map FHIR Practitioner resource to internal data model", () => {
  const practitioner = fhirMapPractitioner(fhirExamplePractitioner, "3");
  expect(practitioner).toMatchSnapshot();
});
