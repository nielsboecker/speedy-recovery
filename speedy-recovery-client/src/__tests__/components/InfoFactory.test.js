import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import InfoFactory from "../../components/secured/patientinformation/InfoFactory";
import PatientInfo from "../../components/secured/patientinformation/PatientInfo";
import ParentInfo from "../../components/secured/patientinformation/ParentInfo";
import PractitionerInfo from "../../components/secured/patientinformation/PractitionerInfo";

Enzyme.configure({ adapter: new Adapter() });

// Note: For a component like this, we should use mount() instead of shallow(), as all
// interesting things happen in the child components

test("InfoFactory renders without crashing", () => {
  mount(
    <InfoFactory user={{ role: "Patient" }} patient={{}} conditions={[]} />
  );
});

test("InfoFactory renders patient info for patient users", () => {
  const wrapper = mount(
    <InfoFactory user={{ role: "Patient" }} patient={{}} conditions={[]} />
  );
  expect(wrapper.children().length).toBe(1);
  expect(wrapper.children().type().name).toEqual("PatientInfo");
});

test("InfoFactory renders parent info for parent users", () => {
  const wrapper = mount(<InfoFactory user={{ role: "Parent" }} patient={{}} />);
  expect(wrapper.children().length).toBe(1);
  expect(wrapper.children().type().name).toEqual("ParentInfo");
});

test("InfoFactory renders practitioner info for practitioner users", () => {
  const wrapper = mount(
    <InfoFactory user={{ role: "Practitioner" }} patient={{}} />
  );
  expect(wrapper.children().length).toBe(1);
  expect(wrapper.children().type().name).toEqual("PractitionerInfo");
});
