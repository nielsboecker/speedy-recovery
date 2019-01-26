import React from 'react'
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
            events: [],
            data: [],
        };

        this.moveEvent = this.moveEvent.bind(this);
        this.newEvent = this.newEvent.bind(this);
    }

    moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
        const { events } = this.state;

        const idx = events.indexOf(event);
        let allDay = event.allDay;

        if (!event.allDay && droppedOnAllDaySlot) {
            allDay = true
        } else if (event.allDay && !droppedOnAllDaySlot) {
            allDay = false
        }

        const updatedEvent = { ...event, start, end, allDay };

        const nextEvents = [...events];
        nextEvents.splice(idx, 1, updatedEvent);

        this.setState({
            events: nextEvents,
        })
    }

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
                            title: this.state.data[key].text.div,
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
                {this.convertData()}
                <DragAndDropCalendar
                popup
                selectable
                localizer={localizer}
                events={this.state.events}
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