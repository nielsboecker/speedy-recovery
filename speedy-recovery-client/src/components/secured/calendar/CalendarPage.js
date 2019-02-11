import React from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.less";
import "./CalendarPage.css";
import { Grid, Segment, Modal, Table, Button } from "semantic-ui-react";
import moment from "moment";

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

moment.locale("en-GB");
const localizer = BigCalendar.momentLocalizer(moment);

class CalendarPage extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      //These are needed for modal
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
                popup
                onDrilldown
                selectable
                localizer={localizer}
                events={this.props.events}
                onSelectEvent={this.toggleEditModal}
                defaultView={BigCalendar.Views.MONTH}
                defaultDate={new Date()}
                step={60}
                views={allViews}
              />

              <Modal
                open={this.state.isEditModalOpen}
                onOpen={this.toggleEditModal}
                closeIcon
                onClose={this.toggleEditModal}
              >
                <Modal.Header>
                  Appointment Details - {this.state.appointment.patient}
                </Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <Table padded celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Appointment Title</Table.HeaderCell>
                          <Table.HeaderCell>Doctor</Table.HeaderCell>
                          <Table.HeaderCell>Date</Table.HeaderCell>
                          <Table.HeaderCell>Time</Table.HeaderCell>
                          <Table.HeaderCell>Location</Table.HeaderCell>
                          <Table.HeaderCell>Comments</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell data-label="Title">
                            {this.state.appointment.title}
                          </Table.Cell>
                          <Table.Cell data-label="Doctor">
                            {this.state.appointment.practitioner}
                          </Table.Cell>
                          <Table.Cell data-label="Date">
                            {this.state.appointment.start !== undefined
                              ? this.state.appointment.start.toLocaleDateString()
                              : ""}
                          </Table.Cell>
                          <Table.Cell data-label="Time">
                            {this.state.appointment.start !== undefined
                              ? this.state.appointment.start.toLocaleTimeString()
                              : ""}
                          </Table.Cell>
                          <Table.Cell data-label="Location">
                            {this.state.appointment.location}
                          </Table.Cell>
                          <Table.Cell data-label="Comments">
                            {this.state.appointment.comment}
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                    <Grid>
                      <Grid.Row centered>
                        <Button>Request Cancellation</Button>
                      </Grid.Row>
                    </Grid>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </div>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }

  componentDidMount() {
    this.props.onChange();
  }
}

export default CalendarPage;
