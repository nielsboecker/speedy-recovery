import {
  fhirMapAppointment, fhirMapCondition, fhirMapMedication, fhirMapPatient
} from "../../service/FhirDataMappingService";
import fhirExamplePatient from "../test_input/fhir_resources_stu3/FhirExamplePatientSTU3.json";
import fhirExamplePatientSteve from "../test_input/fhir_resources_stu3/FhirExamplePatientSteveSTU3.json";
import fhirShortApp from "../test_input/fhir_resources_stu3/FhirSingleExampleAppointmentSTU3.json";
import fhirExampleCondition from "../test_input/fhir_resources_stu3/FhirExampleConditionSTU3.json";
import fhirExampleMedication from "../test_input/fhir_resources_stu3/FhirExampleMedicationSTU3.json";

test("map FHIR Patient resource to internal user data model", () => {
  const user = fhirMapPatient(fhirExamplePatient, "3");
  expect(user).toMatchSnapshot();
});

test("map FHIR Patient resource(Steve Richey) to internal user data model", () => {
  const user = fhirMapPatient(fhirExamplePatientSteve, "3");
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
