import * as React from "react";
import PractitionerCalendar from "./PractitionerCalendar";
import PatientCalendar from "./PatientCalendar";

class CalendarFactory extends React.Component {

   render() {
        switch(this.props.role) {
            case 'Patient':
                return <PatientCalendar
                    events={this.props.events}
                    onChange={this.props.onChange}
                />;
            case 'Parent':
                return;
            case 'Practitioner':
                return <PractitionerCalendar
                    events={this.props.events}
                    onChange={this.props.onChange}
                />;
            default:
                return undefined;
        }
    }
}

export default CalendarFactory;