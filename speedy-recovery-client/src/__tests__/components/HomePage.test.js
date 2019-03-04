import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import exampleUser from "../test_input/internal/ExampleUser.json";
import fhirExamplePatient from "../test_input/fhir_resources_stu3/FhirExamplePatientSTU3.json";
import exampleAppointment from "../test_input/internal/ExampleAppointment";
import HomePageForPatient from "../../components/secured/home/HomePageForPatient"
import HomePageForParent from "../../components/secured/home/HomePageForParent"
import HomePageForPractitioner from "../../components/secured/home/HomePageForPractitioner"



Enzyme.configure({ adapter: new Adapter() });

it("Patient's home page renders without crashing", () => {
  shallow(<HomePageForPatient user={exampleUser} patient={fhirExamplePatient} event={exampleAppointment} />);
});

it("Parent's home page renders without crashing", () => {
  shallow(<HomePageForParent user={exampleUser} patient={fhirExamplePatient} event={exampleAppointment} />);
});

it("Practitioner's home page renders without crashing", () => {
  shallow(<HomePageForPractitioner user={exampleUser} patient={fhirExamplePatient} event={exampleAppointment} />);
});


