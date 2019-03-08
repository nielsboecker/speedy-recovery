import React from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.less";
import "../CalendarPages.css";
import { Grid, Segment } from "semantic-ui-react";

class PatientCalendar extends React.Component {
  render() {
    return (
      <Grid divided="vertically">
        <Grid.Column>
          <Segment>
            <div style={{ height: 450 }}>
              <BigCalendar
                localizer={this.props.localizer}
                events={this.props.events}
                onSelectEvent={this.toggleEditModal}
                defaultView={BigCalendar.Views.AGENDA}
                defaultDate={new Date()}
                views={["agenda"]}
                ref={node => {
                  this.bigCalendarRef = node;
                }}
              />
            </div>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default PatientCalendar;
