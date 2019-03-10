import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PatientHomePage from "../../components/secured/home/PatientHomePage";
import ParentHomePage from "../../components/secured/home/ParentHomePage";
import PractitionerHomePage from "../../components/secured/home/PractitionerHomePage";

Enzyme.configure({ adapter: new Adapter() });

it("Patient's home page renders without crashing", () => {
  shallow(
    <PatientHomePage/>
  );
});

it("Parent's home page renders without crashing", () => {
  shallow(
    <ParentHomePage/>
  );
});

it("Practitioner's home page renders without crashing", () => {
  shallow(
    <PractitionerHomePage/>
  );
});
