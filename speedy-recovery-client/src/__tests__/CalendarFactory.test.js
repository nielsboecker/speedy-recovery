import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CalendarFactory from "../components/secured/calendar/CalendarFactory";
import ParentCalendar from "../components/secured/calendar/ParentCalendar";
import PatientCalendar from "../components/secured/calendar/PatientCalendar";
import PractitionerCalendar from "../components/secured/calendar/PractitionerCalendar";

Enzyme.configure({ adapter: new Adapter() });

// Note: For a component like this, we should use mount() instead of shallow(), as all
// interesting things happen in the child components

test("CalendarFactory renders without crashing", () => {
  mount(<CalendarFactory onChange={jest.fn()} events={[]} role="Patient"/>);
});

test("CalendarFactory renders patient calendar for patient users", () => {
  const wrapper = mount(<CalendarFactory onChange={jest.fn()} events={[]} role="Patient"/>);
  expect(wrapper.children().length).toBe(1);
  expect(wrapper.children().type().name).toEqual("PatientCalendar");
});

test("CalendarFactory renders parent calendar for parent users", () => {
  const wrapper = mount(<CalendarFactory onChange={jest.fn()} events={[]} role="Parent"/>);
  expect(wrapper.children().length).toBe(1);
  expect(wrapper.children().type().name).toEqual("ParentCalendar");
});

test("CalendarFactory renders practitioner calendar for practitioner users", () => {
  const wrapper = mount(<CalendarFactory onChange={jest.fn()} events={[]} role="Practitioner"/>);
  expect(wrapper.children().length).toBe(1);
  expect(wrapper.children().type().name).toEqual("PractitionerCalendar");
});
