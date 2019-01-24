import React from 'react'
// import events from './events'
import AppointmentData from './appointmentExample.json'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less'
import './CalendarPage.css'
import moment from 'moment'

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

moment.locale('en-GB');
const localizer = BigCalendar.momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class CalendarPage extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            // events: events,
            data: [],
        };

        this.moveEvent = this.moveEvent.bind(this);
        this.newEvent = this.newEvent.bind(this);

        this.convertData();
    }

    moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
        const { data } = this.state;

        const idx = data.indexOf(event);
        let allDay = event.allDay;

        if (!event.allDay && droppedOnAllDaySlot) {
            allDay = true
        } else if (event.allDay && !droppedOnAllDaySlot) {
            allDay = false
        }

        const updatedEvent = { ...event, start, end, allDay };

        const nextEvents = [...data];
        nextEvents.splice(idx, 1, updatedEvent);

        this.setState({
            data: nextEvents,
        })
    }

    newEvent = ({start, end}) => {
        //Change next two lines to make nicer way of adding an event
        const title = window.prompt('New Event name');
        if (title)
            this.setState({
                data: [
                    ...this.state.data,
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
        * 1) id
        * 2) status of patient
        * 3) Service Type
        * 4) Appointment Type code
        * 5) Reason reference display
        * 6) Priority
        * 7) Description/title
        * 8) Start date
        * 9) End date
        * 10) Date created
        * 11) Comment
        * 12) Patient
        * 13) Practitioner
        * 14) Location
        * */

        for (let key in AppointmentData) {
            var nextEvent = {id: AppointmentData[key].id,
                            status: AppointmentData[key].status,
                            s_type: AppointmentData[key].serviceType.display,
                            app_type: AppointmentData[key].appointmentType.code,
                            reason: AppointmentData[key].reasonReference.display,
                            priority: AppointmentData[key].priority,
                            title: AppointmentData[key].description,
                            start: new Date(AppointmentData[key].start),
                            end: new Date(AppointmentData[key].end),
                            created: new Date(AppointmentData[key].created),
                            comment: AppointmentData[key].comment,
                            patient: AppointmentData[key].participant[0].actor.display,
                            practitioner: AppointmentData[key].participant[1].actor.display,
                            location: AppointmentData[key].participant[2].actor.display };
            this.state.data.push(nextEvent);
        }
    }

    render() {
        return (

            <div style={{height: 550}}>

                <DragAndDropCalendar
                popup
                selectable
                localizer={localizer}
                events={this.state.data}
                onEventDrop={this.moveEvent}
                onSelectSlot={this.newEvent}
                defaultView={BigCalendar.Views.MONTH}
                defaultDate={new Date()}
                step={60}
                views={allViews}

            />
            </div>

        )
    }
}

export default CalendarPage