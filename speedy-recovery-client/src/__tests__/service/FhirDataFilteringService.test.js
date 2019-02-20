import fhirExamplePatient from "../test_input/fhir_resources_stu3/FhirExamplePatient.json";
import fhirShortApp from "../test_input/fhir_resources_stu3/FhirShortExampleAppointments.json";
import fhirExampleCondition from "../test_input/fhir_resources_stu3/FhirExampleCondition.json";
import fhirExampleMedication from "../test_input/fhir_resources_stu3/FhirExampleMedication.json";
import {
    filterAppointmentResource,
    filterConditionResource, filterMedicationResource,
    filterPatientResource
} from "../../service/FhirDataFilteringService";

test("test1", () => {
    console.log(filterPatientResource(fhirExamplePatient));
});

test("test2", () => {
    console.log(filterAppointmentResource(fhirShortApp));
});

test("test3", () => {
    console.log(filterConditionResource(fhirExampleCondition));
});

test("test4", () => {
    console.log(filterMedicationResource(fhirExampleMedication));
});