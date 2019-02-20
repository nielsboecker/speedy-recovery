import fhirBrokenPatient from "../test_input/fhir_resources_stu3/broken_resources/FhirExamplePatientBroken";
import fhirBrokenApp from "../test_input/fhir_resources_stu3/broken_resources/FhirSingleExampleAppointmentBroken";
import fhirBrokenCondition from "../test_input/fhir_resources_stu3/broken_resources/FhirExampleConditionBroken";
import fhirBrokenMedication from "../test_input/fhir_resources_stu3/broken_resources/FhirExampleMedicationBroken";
import fhirExamplePatient from "../test_input/fhir_resources_stu3/FhirExamplePatient.json";
import fhirSingleApp from "../test_input/fhir_resources_stu3/FhirSingleExampleAppointment.json";
import fhirExampleCondition from "../test_input/fhir_resources_stu3/FhirExampleCondition.json";
import fhirExampleMedication from "../test_input/fhir_resources_stu3/FhirExampleMedication.json";

import {
    filterAppointmentResource,
    filterConditionResource,
    filterMedicationResource,
    filterPatientResource
} from "../../service/FhirDataFilteringService";

test("filter out patient resource with missing info only", () => {
    expect(filterPatientResource(fhirBrokenPatient)).toBe(undefined);
    expect(filterPatientResource(fhirExamplePatient)).toMatchSnapshot();
});

test("filter out appointment resource with missing info only", () => {
    expect(filterAppointmentResource(fhirBrokenApp)).toBe(undefined);
    expect(filterAppointmentResource(fhirSingleApp)).toMatchSnapshot();
});

test("filter out condition resource with missing info only", () => {
    expect(filterConditionResource(fhirBrokenCondition)).toBe(undefined);
    expect(filterConditionResource(fhirExampleCondition)).toMatchSnapshot();
});

test("filter out medication resource with missing info only", () => {
    expect(filterMedicationResource(fhirBrokenMedication)).toBe(undefined)
    expect(filterMedicationResource(fhirExampleMedication)).toMatchSnapshot();
});
