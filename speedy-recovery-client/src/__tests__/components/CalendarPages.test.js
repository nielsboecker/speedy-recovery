import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import exampleAppointment from "../test_input/internal/ExampleAppointment";
import ParentCalendar from "../../components/secured/calendar/parent/ParentCalendar";
import PatientCalendar from "../../components/secured/calendar/patient/PatientCalendar";
import PractitionerCalendar from "../../components/secured/calendar/practitioner/PractitionerCalendar";
import exampleAppointments from "../test_input/internal/ExampleAppointments";
import BigCalendar from "react-big-calendar";
import moment from "moment";

Enzyme.configure({ adapter: new Adapter() });

moment.locale("en-GB");
const localizer = BigCalendar.momentLocalizer(moment);

it("parentCalendar renders without crashing", () => {
  shallow(<ParentCalendar onChange={jest.fn()} events={exampleAppointment} />);
});

it("patientCalendar renders without crashing", () => {
  shallow(<PatientCalendar onChange={jest.fn()} events={exampleAppointment} />);
});

it("practitionerCalendar renders without crashing", () => {
  shallow(
    <PractitionerCalendar onChange={jest.fn()} events={exampleAppointment} />
  );
});

it("test modals on calendar", () => {
  shallow(<ParentCalendar onChange={jest.fn()} events={exampleAppointment} />);
});

it("can access BigCalendar instance for patient", () => {
  const wrapper = mount(
    <PatientCalendar
      onChange={jest.fn()}
      events={exampleAppointments}
      localizer={localizer}
    />
  );
  const { bigCalendarRef } = wrapper.instance();
  expect(bigCalendarRef).toBeDefined();
});

it("can access BigCalendar instance for practitioner", () => {
  const wrapper = mount(
    <PractitionerCalendar
      onChange={jest.fn()}
      events={exampleAppointments}
      localizer={localizer}
    />
  );
  const { bigCalendarRef } = wrapper.instance();
  expect(bigCalendarRef).toBeDefined();
});

it("can access BigCalendar instance for parent", () => {
  const wrapper = mount(
    <ParentCalendar
      onChange={jest.fn()}
      events={exampleAppointments}
      localizer={localizer}
    />
  );
  const { bigCalendarRef } = wrapper.instance();
  expect(bigCalendarRef).toBeDefined();
});
