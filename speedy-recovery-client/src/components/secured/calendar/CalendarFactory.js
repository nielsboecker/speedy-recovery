import * as React from "react";
import PractitionerCalendar from "./PractitionerCalendar";
import PatientCalendar from "./PatientCalendar";
import ParentCalendar from "./ParentCalendar";
import BigCalendar from "react-big-calendar";
import moment from "moment";

moment.locale("en-GB");
const localizer = BigCalendar.momentLocalizer(moment);

class CalendarFactory extends React.Component {
  render() {
    switch (this.props.role) {
      case "Patient":
        return (
          <PatientCalendar events={this.props.events} localizer={localizer} />
        );
      case "Parent":
        return (
          <ParentCalendar
            events={this.props.events}
            id={this.props.child}
            localizer={localizer}
          />
        );
      case "Practitioner":
        return (
          <PractitionerCalendar
            events={this.props.events}
            id={this.props.id}
            localizer={localizer}
          />
        );
      default:
        console.error(
          `Cannot render calendar for user role "${this.props.role}"`
        );
        return null;
    }
  }
}

export default CalendarFactory;
