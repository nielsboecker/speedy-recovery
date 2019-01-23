import React from 'react'
import events from './events'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less'
import './CalendarPage.css';
import moment from 'moment';

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

moment.locale('en-GB');
const localizer = BigCalendar.momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class CalendarPage extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            events: events,
        };

        this.moveEvent = this.moveEvent.bind(this);
        this.newEvent = this.newEvent.bind(this)
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
        const description = window.prompt('Event Description');
        if (title)
            this.setState({
                events: [
                    ...this.state.events,
                    {
                        start,
                        end,
                        title,
                        description,
                    },
                ],
            })
    };

    render() {
        return (
            <div style={{height: 550}}>
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
            <p></p>
            </div>

        )
    }
}

export default CalendarPage