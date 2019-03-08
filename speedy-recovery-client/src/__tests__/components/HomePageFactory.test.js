import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import HomePageFactory from "../../components/secured/home/HomePageFactory";
import HomePageForPatient from "../../components/secured/home/HomePageForPatient";
import HomePageForParent from "../../components/secured/home/HomePageForParent";
import HomePageForPractitioner from "../../components/secured/home/HomePageForPractitioner";

Enzyme.configure({ adapter: new Adapter() });

test("HomePageFactory renders without crashing", () => {
  mount(
    <HomePageFactory
      user={{}}
      patient={{}}
      events={[]}
      homePage={"PatientHomePage"}
    />
  );
});

test("HomePageFactory renders patient's home page for patient users", () => {
  const wrapper = mount(
    <HomePageFactory
      user={{}}
      patient={{}}
      events={[]}
      homePage={"PatientHomePage"}
    />
  );
  expect(wrapper.children().length).toBe(1);
  expect(wrapper.children().type().name).toEqual("HomePageForPatient");
});

test("HomePageFactory renders parent's home page for parent users", () => {
  const wrapper = mount(
    <HomePageFactory
      user={{}}
      patient={{}}
      events={[]}
      homePage={"ParentHomePage"}
    />
  );
  expect(wrapper.children().length).toBe(1);
  expect(wrapper.children().type().name).toEqual("HomePageForParent");
});

test("HomePageFactory renders practitioner's home page for practitioner users", () => {
  const wrapper = mount(
    <HomePageFactory
      user={{}}
      patient={{}}
      events={[]}
      homePage={"PractitionerHomePage"}
    />
  );
  expect(wrapper.children().length).toBe(1);
  expect(wrapper.children().type().name).toEqual("HomePageForPractitioner");
});
