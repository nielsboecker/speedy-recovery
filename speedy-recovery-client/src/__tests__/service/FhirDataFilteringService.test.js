import fhirBrokenPatient from "../test_input/fhir_resources_stu3/broken_resources/FhirExamplePatientBroken";
import fhirBrokenApp from "../test_input/fhir_resources_stu3/broken_resources/FhirSingleExampleAppointmentBroken";
import fhirBrokenCondition from "../test_input/fhir_resources_stu3/broken_resources/FhirExampleConditionBroken";
import fhirBrokenMedication from "../test_input/fhir_resources_stu3/broken_resources/FhirExampleMedicationBroken";
import fhirExamplePatient from "../test_input/fhir_resources_stu3/FhirExamplePatientSTU3.json";
import fhirSingleApp from "../test_input/fhir_resources_stu3/FhirSingleExampleAppointmentSTU3.json";
import fhirExampleCondition from "../test_input/fhir_resources_stu3/FhirExampleConditionSTU3.json";
import fhirExampleMedication from "../test_input/fhir_resources_stu3/FhirExampleMedicationSTU3.json";

import {
  filterAppointmentResource,
  filterConditionResource,
  filterMedicationResource,
  filterPatientResource
} from "../../service/FhirDataFilteringService";

test("filter out patient resource with missing info only", () => {
  expect(filterPatientResource(fhirBrokenPatient)).toBeFalsy();
  expect(filterPatientResource(fhirExamplePatient)).toEqual(fhirExamplePatient);
});

test("filter out appointment resource with missing info only", () => {
  expect(filterAppointmentResource(fhirBrokenApp)).toBeFalsy();
  expect(filterAppointmentResource(fhirSingleApp)).toEqual(fhirSingleApp);
});

test("filter out condition resource with missing info only", () => {
  expect(filterConditionResource(fhirBrokenCondition)).toBeFalsy();
  expect(filterConditionResource(fhirExampleCondition)).toEqual(
    fhirExampleCondition
  );
});

test("filter out medication resource with missing info only", () => {
  expect(filterMedicationResource(fhirBrokenMedication)).toBeFalsy();
  expect(filterMedicationResource(fhirExampleMedication)).toEqual(
    fhirExampleMedication
  );
});
