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

/* This file tests the mapping from FHIR DSTU2 resources to our internal format*/

import {
  fhirMapAppointment,
  fhirMapCarePlan,
  fhirMapCondition,
  fhirMapMedication,
  fhirMapMedicationDispense,
  fhirMapPerson,
  fhirMapPractitioner
} from "../../service/FhirDataMappingService";
import fhirExamplePatient from "../test_input/fhir_resources_stu2/FhirExamplePatientSTU2.json";
import fhirShortApp from "../test_input/fhir_resources_stu2/FhirExampleAppointmentSTU2.json";
import fhirExampleCondition from "../test_input/fhir_resources_stu2/FhirExampleConditionSTU2.json";
import fhirExampleMedication from "../test_input/fhir_resources_stu2/FhirExampleMedicationSTU2.json";
import fhirExampleCarePlan from "../test_input/fhir_resources_stu2/FhirExampleCarePlanSTU2.json";
import fhirExampleMedicationDispense from "../test_input/fhir_resources_stu2/FhirExampleMedicationDispenseSTU2.json";
import fhirExamplePractitioner from "../test_input/fhir_resources_stu2/FhirExamplePractitionerSTU2.json";

test("map FHIR Patient resource to internal user data model", () => {
  const user = fhirMapPerson(fhirExamplePatient, "2");
  expect(user).toMatchSnapshot();
});

test("map FHIR Appointment resource to calendar data model", () => {
  const appointment = fhirMapAppointment(fhirShortApp, "2");
  expect(appointment).toMatchSnapshot();
});

test("map FHIR Condition resource to internal data model", () => {
  const condition = fhirMapCondition(fhirExampleCondition, "2");
  expect(condition).toMatchSnapshot();
});

test("map FHIR Medication resource to internal data model", () => {
  const medication = fhirMapMedication(fhirExampleMedication, "2");
  expect(medication).toMatchSnapshot();
});

test("map FHIR CarePlan resource to internal data model", () => {
  const carePlan = fhirMapCarePlan(fhirExampleCarePlan, "2");
  expect(carePlan).toMatchSnapshot();
});

test("map FHIR MedicationDispense resource to internal data model", () => {
  const medicationDispense = fhirMapMedicationDispense(
    fhirExampleMedicationDispense,
    "2"
  );
  expect(medicationDispense).toMatchSnapshot();
});
test("map FHIR Practitioner resource to internal data model", () => {
  const practitioner = fhirMapPractitioner(fhirExamplePractitioner, "2");
  expect(practitioner).toMatchSnapshot();
});
