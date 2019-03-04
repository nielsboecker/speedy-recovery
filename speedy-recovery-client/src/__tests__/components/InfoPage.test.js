import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import exampleUser from "../test_input/internal/ExampleUser.json";
import PatientInfo from "../../components/secured/patientinformation/PatientInfo";
import ParentInfo from "../../components/secured/patientinformation/ParentInfo";
import PractitionerInfo from "../../components/secured/patientinformation/PractitionerInfo";
import fhirExamplePatient from "../test_input/fhir_resources_stu3/FhirExamplePatientSTU3.json";

Enzyme.configure({ adapter: new Adapter() });

it("PractitionerInfo renders without crashing", () => {
  shallow(<PractitionerInfo user={exampleUser} patient={fhirExamplePatient} />);
});

it("PatientInfo renders without crashing", () => {
  shallow(
    <PatientInfo user={exampleUser} conditions={[]} medicationDispenses={[]} />
  );
});

it("ParentInfo renders without crashing", () => {
  shallow(<ParentInfo user={exampleUser} />);
});
