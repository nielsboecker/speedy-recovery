import { mapPatientToUser } from "../dataaccess/FhirDataAdapter";
import fhirExamplePatient from "./test_input/fhir_r3/FhirExamplePatient.json";

test("map FHIR Patient resource to internal user data model", () => {
  const user = mapPatientToUser(fhirExamplePatient);
  expect(user).toMatchSnapshot();
});
