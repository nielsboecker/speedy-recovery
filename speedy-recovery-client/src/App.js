import React from 'react';
import events from '../src/events'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = BigCalendar.momentLocalizer(moment);

moment.locale('en-GB');

const propTypes = {};

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

class App extends React.Component {
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
              // min={new Date(2008, 0, 1, 8, 0)} // 8.00 AM
              // max={new Date(2008, 0, 1, 17, 0)} // Max will be 6.00 PM!
              // date={new Date(2018, 0, 1)}
              defaultDate={new Date()}
              onSelectEvent={event => alert(event.title)}
              onSelectSlot={this.handleSelect}
          />
        </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
