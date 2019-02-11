import * as React from "react";
import PractitionerCalendar from "./PractitionerCalendar";
import PatientCalendar from "./PatientCalendar";
import ParentCalendar from "./ParentCalendar";

class CalendarFactory extends React.Component {


   render() {
        switch(this.props.role) {
            case 'Patient':
                return <PatientCalendar
                    events={this.props.events}
                    onChange={this.props.onChange}
                />;
            case 'Parent':
                return <ParentCalendar
                    events={this.props.events}
                    onChange={this.props.onChange}
                />;
            case 'Practitioner':
                return <PractitionerCalendar
                    events={this.props.events}
                    onChange={this.props.onChange}
                />;
            default:
                //TODO: What should happen here?
                return undefined;
        }
    }


}

export default CalendarFactory;