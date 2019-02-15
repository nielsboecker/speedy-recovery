import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import exampleUser from "./test_input/internal/ExampleUser.json";
import InfoFactory from "../components/secured/patientInformation/InfoFactory";
import PatientInfo from "../components/secured/patientInformation/PatientInfo";
import ParentInfo from "../components/secured/patientInformation/ParentInfo";
import PractitionerInfo from "../components/secured/patientInformation/PractitionerInfo";
import fhirExamplePatient from "./test_input/fhir_r3/FhirExamplePatient.json";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  shallow(<InfoFactory user={exampleUser} patResource={fhirExamplePatient} />);
});

it("renders without crashing", () => {
  shallow(
    <PractitionerInfo user={exampleUser} extraInfo={fhirExamplePatient} />
  );
});

it("renders without crashing", () => {
  shallow(<PatientInfo user={exampleUser} />);
});

it("renders without crashing", () => {
  shallow(<ParentInfo user={exampleUser} />);
});
