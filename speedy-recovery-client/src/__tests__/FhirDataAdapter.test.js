import {mapAppointmentToCalendar, mapPatientToUser} from "../dataaccess/FhirDataAdapter";
import fhirExamplePatient from "./test_input/fhir_r3/FhirExamplePatient.json";
import fhirShortApp from "./test_input/fhir_r3/FhirShortExampleAppointments.json";

test("map FHIR Patient resource to internal user data model", () => {
  const user = mapPatientToUser(fhirExamplePatient);
  expect(user).toMatchSnapshot();
});

test("map FHIR Appointment resource to calendar data model" , () => {
  const app = mapAppointmentToCalendar(fhirShortApp);
  expect(app).toMatchSnapshot();
});