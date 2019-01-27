import React from 'react'
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less'
import './CalendarPage.css'
import AppointmentData from './test_files/smallAppointmentList.json';
import moment from 'moment'

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

moment.locale('en-GB');
const localizer = BigCalendar.momentLocalizer(moment);

class CalendarPage extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            events: [],
            data: AppointmentData,
            appointment: [],
        };
        this.newEvent = this.newEvent.bind(this);
        this.convertData();
    }

    onSelectEvent = event => {
        this.setState({
            appointment: event,
        });
    };

    newEvent = ({start, end}) => {
        //Change next two lines to make nicer way of adding an event
        const title = window.prompt('New Event name');
        if (title)
            this.setState({
                events: [
                    ...this.state.events,
                    {
                        start,
                        end,
                        title,
                    },
                ],
            })
    };

    convertData() {
        /*Data required from JSON:
        *   id, title of appointment, status of patient, meeting reason, priority, description, start date, end date,
        *   comments, patient name, practitioner name, location
        * */

        for (let key in this.state.data) {
            var nextEvent = {id: this.state.data[key].id,
                            title: this.state.data[key].text.div.substring(5,this.state.data[key].text.div.length - 6),
                            status: this.state.data[key].status,
                            reason: this.state.data[key].type.coding[0].display,
                            priority: this.state.data[key].priority,
                            description: this.state.data[key].description,
                            start: new Date(this.state.data[key].start),
                            end: new Date(this.state.data[key].end),
                            comment: this.state.data[key].comment,
                            patient: this.state.data[key].participant[0].actor.display,
                            practitioner: this.state.data[key].participant[1].actor.display,
                            location: this.state.data[key].participant[2].actor.display };
            this.state.events.push(nextEvent);

        }
    }

    render() {
        return (

            <div style={{height: 550}}>
                <BigCalendar
                popup
                onDrilldown
                selectable
                localizer={localizer}
                events={this.state.events}
                onSelectEvent={this.onSelectEvent}
                // onSelectSlot={this.newEvent}
                defaultView={BigCalendar.Views.MONTH}
                defaultDate={new Date()}
                step={60}
                views={allViews}

            />
                <p></p>
            <center>
                <div className="ui card" >
                    <div className="content">
                        <div className="header">Appointment Details</div>
                    </div>
                    <div className="content">
                        <div className="ui small feed">
                            <div className="event">
                                <div className="content">
                                    <div className="summary">
                                        Title: {this.state.appointment.title}
                                    </div>
                                </div>
                            </div>
                            <div className="event">
                                <div className="content">
                                    <div className="summary">
                                        Doctor: {this.state.appointment.practitioner}
                                    </div>
                                </div>
                            </div>
                            <div className="event">
                                <div className="content">
                                    <div className="summary">
                                        Patient: {this.state.appointment.patient}
                                    </div>
                                </div>
                            </div>
                            <div className="event">
                                <div className="content">
                                    <div className="summary">
                                        Location: {this.state.appointment.location}
                                    </div>
                                </div>
                            </div>
                            <div className="event">
                                <div className="content">
                                    <div className="summary">
                                        Comments: {this.state.appointment.comment}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="extra content">
                        <button className="ui button">Request Cancellation</button>
                    </div>
                </div>
            </center>
            </div>

        )
    }
}

export default CalendarPage