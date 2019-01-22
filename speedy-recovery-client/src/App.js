import React from 'react';
import events from '../src/events'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = BigCalendar.momentLocalizer(moment);

moment.locale('en-GB');

const propTypes = {};

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

class Calendar extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { events }
  }

  handleSelect = ({start, end}) => {
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


  render() {
    return (
        <div style={{height: 550}}>
          <BigCalendar
              selectable
              localizer={localizer}
              events={this.state.events}
              step={60}
              views={allViews}
              defaultDate={new Date()}
              onSelectEvent={event => alert(event.title)}
              onSelectSlot={this.handleSelect}
          />
        </div>
    );
  }
}

Calendar.propTypes = propTypes;

export default Calendar;
