import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import exampleAppointment from "./test_input/internal/ExampleAppointment";
import CalendarFactory from "../components/secured/calendar/CalendarFactory";
import ParentCalendar from "../components/secured/calendar/ParentCalendar";
import PatientCalendar from "../components/secured/calendar/PatientCalendar";
import PractitionerCalendar from "../components/secured/calendar/PractitionerCalendar";

Enzyme.configure({ adapter: new Adapter() });

const emptyFunction = () => {};

it("calendarFactory renders without crashing", () => {
  shallow(
    <CalendarFactory onChange={emptyFunction} events={exampleAppointment} />
  );
});

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
