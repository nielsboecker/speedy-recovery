import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import exampleAppointment from "./test_input/internal/ExampleAppointment";
import ParentCalendar from "../components/secured/calendar/ParentCalendar";
import PatientCalendar from "../components/secured/calendar/PatientCalendar";
import PractitionerCalendar from "../components/secured/calendar/PractitionerCalendar";
import exampleAppointments from "./test_input/internal/ExampleAppointments";
import BigCalendar from "react-big-calendar";
import moment from "moment";

Enzyme.configure({ adapter: new Adapter() });

const emptyFunction = () => {};
moment.locale("en-GB");
const localizer = BigCalendar.momentLocalizer(moment);

it("parentCalendar renders without crashing", () => {
  shallow(
    <ParentCalendar onChange={emptyFunction} events={exampleAppointment} />
  );
});

it("patientCalendar renders without crashing", () => {
  shallow(
    <PatientCalendar onChange={emptyFunction} events={exampleAppointment} />
  );
});

it("practitionerCalendar renders without crashing", () => {
  shallow(
    <PractitionerCalendar
      onChange={emptyFunction}
      events={exampleAppointment}
    />
  );
});

it("test modals on calendar", () => {
  shallow(
    <ParentCalendar onChange={emptyFunction} events={exampleAppointment} />
  );
});

it("can access BigCalendar instance for patient", () => {

  const wrapper = mount(<PatientCalendar onChange={emptyFunction} events={exampleAppointments} localizer={localizer}/>);
  const { bigCalendarRef } = wrapper.instance();
  expect(bigCalendarRef).not.toBeUndefined();
  // TODO: @Josh Feel free to use this for click tests
});

it("can access BigCalendar instance for practitioner", () => {
  const wrapper = mount(<PractitionerCalendar onChange={emptyFunction} events={exampleAppointments} localizer={localizer}/>);
  const { bigCalendarRef } = wrapper.instance();
  expect(bigCalendarRef).not.toBeUndefined();
});

it("can access BigCalendar instance for parent", () => {
  const wrapper = mount(<ParentCalendar onChange={emptyFunction} events={exampleAppointments} localizer={localizer}/>);
  const { bigCalendarRef } = wrapper.instance();
  expect(bigCalendarRef).not.toBeUndefined();
});
