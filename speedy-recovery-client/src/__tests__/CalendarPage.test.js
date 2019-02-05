import React from "react";
import CalendarPage from "../components/secured/calendar/CalendarPage";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import exampleAppointment from "./test_input/internal/ExampleAppointment";

Enzyme.configure({ adapter: new Adapter() });

const emptyFunction = () => {};

it("renders without crashing", () => {
  shallow(
    <CalendarPage onChange={emptyFunction} events={exampleAppointment} />
  );
});
