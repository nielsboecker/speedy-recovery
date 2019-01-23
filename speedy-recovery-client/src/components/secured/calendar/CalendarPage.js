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
        const description = window.prompt('Event Description');
        if (title)
            this.setState({
                data: [
                    ...this.state.data,
                    {
                        start,
                        end,
                        title,
                        description,
                    },
                ],
            })
    };

    convertData() {
        /*Data required from JSON:
        * 1) id
        * 2) status
        * 3) Service Category
        * 4) Service Type
        * 5) Appointment Type code
        * 6) Reason reference display
        * 7) Priority
        * 8) Description
        * 9) Start
        * 10) End
        * 11) Created
        * 12) Comment
        * 13) Patient
        * 14) Practitioner
        * 15) Location
        * */

        for (var key in AppointmentData) {
            var nextEvent = {id: AppointmentData[key].id,
                            title: AppointmentData[key].description,
                            start: new Date(AppointmentData[key].start),
                            end: new Date(AppointmentData[key].end),
                            description: AppointmentData[key].comment};
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