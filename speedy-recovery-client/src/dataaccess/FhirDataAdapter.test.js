import { mapPatientToUser } from "./FhirDataAdapter";
import fhirExamplePatient from "./test_files/FhirExamplePatient.json";

test("map FHIR Patient resource to internal user data model", () => {
  const user = mapPatientToUser(fhirExamplePatient);
  expect(user).toMatchSnapshot();
});