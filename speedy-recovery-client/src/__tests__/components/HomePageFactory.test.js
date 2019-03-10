import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import HomePageFactory from "../../components/secured/home/HomePageFactory";
import PatientHomePage from "../../components/secured/home/PatientHomePage";
import ParentHomePage from "../../components/secured/home/ParentHomePage";
import PractitionerHomePage from "../../components/secured/home/PractitionerHomePage";

Enzyme.configure({ adapter: new Adapter() });

test("HomePageFactory renders without crashing", () => {
  mount(
    <HomePageFactory user={{ role: "patient" }} patient={{}} events={[]} />
  );
});

test("HomePageFactory renders patient's home page for patient users", () => {
  const wrapper = mount(
    <HomePageFactory user={{ role: "patient" }} patient={{}} events={[]} />
  );
  expect(wrapper.children().length).toBe(1);
  expect(wrapper.children().type().name).toEqual("PatientHomePage");
});

test("HomePageFactory renders parent's home page for parent users", () => {
  const wrapper = mount(
    <HomePageFactory user={{ role: "parent" }} patient={{}} events={[]} />
  );
  expect(wrapper.children().length).toBe(1);
  expect(wrapper.children().type().name).toEqual("ParentHomePage");
});

test("HomePageFactory renders practitioner's home page for practitioner users", () => {
  const wrapper = mount(
    <HomePageFactory user={{ role: "practitioner" }} patient={{}} events={[]} />
  );
  expect(wrapper.children().length).toBe(1);
  expect(wrapper.children().type().name).toEqual("PractitionerHomePage");
});
