import React from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.less";
import "../CalendarPages.css";
import { Grid, Segment } from "semantic-ui-react";
import ParentModal from "./ParentModal";

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

class ParentCalendar extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      appointment: [],
      isEditModalOpen: false
    };
  }

  toggleEditModal = event => {
    this.setState({
      isEditModalOpen: !this.state.isEditModalOpen,
      appointment: event
    });
  };

  render() {
    return (
      <Grid divided="vertically">
        <Grid.Column>
          <Segment>
            <div style={{ height: 550 }}>
              <BigCalendar
                localizer={this.props.localizer}
                events={this.props.events}
                onSelectEvent={this.toggleEditModal}
                defaultView={BigCalendar.Views.MONTH}
                defaultDate={new Date()}
                views={allViews}
                ref={node => {
                  this.bigCalendarRef = node;
                }}
              />

              <ParentModal
                  appointment={this.state.appointment}
                  toggleEditModal={this.toggleEditModal}
                  isEditModalOpen={this.state.isEditModalOpen}
                  id={this.props.id}
              />
            </div>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default ParentCalendar;
