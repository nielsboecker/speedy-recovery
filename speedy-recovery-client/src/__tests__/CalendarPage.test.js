import React from "react";
import CalendarPage from "../components/secured/calendar/CalendarPage";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import exampleAppointments from "./test_input/internal/ExampleAppointments";

Enzyme.configure({ adapter: new Adapter() });

const emptyFunction = () => {
};

it("renders without crashing", () => {
  shallow(
    <CalendarPage onChange={emptyFunction} events={exampleAppointments}/>
  );
});

it("can access BigCalendar instance", () => {
  const wrapper = mount(<CalendarPage onChange={emptyFunction} events={exampleAppointments}/>);
  const { bigcal } = wrapper.instance();
  console.log(bigcal);
  // TODO: @Josh
});
