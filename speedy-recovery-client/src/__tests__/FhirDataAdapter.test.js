import {
  mapAppointment,
  mapCondition,
  mapMedication,
  mapPatientToUser
} from "../dataaccess/FhirDataAdapter";
import fhirExamplePatient from "./test_input/fhir_r3/FhirExamplePatient.json";
import fhirShortApp from "./test_input/fhir_r3/FhirShortExampleAppointments.json";
import fhirExampleCondition from "./test_input/fhir_r3/FhirExampleCondition.json";
import fhirExampleMedication from "./test_input/fhir_r3/FhirExampleMedication.json";

test("map FHIR Patient resource to internal user data model", () => {
  const user = mapPatientToUser(fhirExamplePatient);
  expect(user).toMatchSnapshot();
});

test("map FHIR Appointment resource to calendar data model", () => {
  const appointment = mapAppointment(fhirShortApp);
  expect(appointment).toMatchSnapshot();
});

test("map FHIR Condition resource to internal data model", () => {
  const condition = mapCondition(fhirExampleCondition);
  expect(condition).toMatchSnapshot();
});

test("map FHIR Medication resource to internal data model", () => {
  const medication = mapMedication(fhirExampleMedication);
  expect(medication).toMatchSnapshot();
});
