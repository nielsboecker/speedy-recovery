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
        switch(this.props.role) {
            case 'Patient':
                return <PatientCalendar
                    events={this.props.events}
                    onChange={this.props.onChange}
                    localizer={localizer}
                />;
            case 'Parent':
                return <ParentCalendar
                    events={this.props.events}
                    onChange={this.props.onChange}
                    localizer={localizer}
                />;
            case 'Practitioner':
                return <PractitionerCalendar
                    events={this.props.events}
                    onChange={this.props.onChange}
                    localizer={localizer}
                />;
            default:
                //TODO: What should happen here?
                return undefined;
        }
    }
}

export default CalendarFactory;