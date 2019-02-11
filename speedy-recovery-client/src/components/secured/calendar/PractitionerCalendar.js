import React from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.less";
import "./CalendarPage.css";
import { Grid, Segment, Modal, Table, Button} from "semantic-ui-react";
import moment from "moment";

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

moment.locale("en-GB");
const localizer = BigCalendar.momentLocalizer(moment);

class PractitionerCalendar extends React.Component {

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
                                localizer={localizer}
                                events={this.props.events}
                                onSelectEvent={this.toggleEditModal}
                                defaultView={BigCalendar.Views.MONTH}
                                defaultDate={new Date()}
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
                                                <Table.Row textAlign='center'>
                                                    <Table.HeaderCell>Appointment Id</Table.HeaderCell>
                                                    <Table.HeaderCell>Status</Table.HeaderCell>
                                                    <Table.HeaderCell>Appointment Type</Table.HeaderCell>
                                                    <Table.HeaderCell>Priority</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                <Table.Row textAlign='center'>
                                                    <Table.Cell data-label="AppId">
                                                        {this.state.appointment.id}
                                                    </Table.Cell>
                                                    <Table.Cell data-label="Status">
                                                        {this.state.appointment.status}
                                                    </Table.Cell>
                                                    <Table.Cell data-label="AppType">
                                                        {this.state.appointment.appType}
                                                    </Table.Cell>
                                                    <Table.Cell data-label="Priority">
                                                        {this.state.appointment.priority}
                                                    </Table.Cell>

                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                        <Table padded celled>
                                            <Table.Header>
                                                <Table.Row textAlign='center'>
                                                    <Table.HeaderCell>Indication</Table.HeaderCell>
                                                    <Table.HeaderCell>Description</Table.HeaderCell>
                                                    <Table.HeaderCell>Supporting Info</Table.HeaderCell>
                                                    <Table.HeaderCell>Comments</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                <Table.Row textAlign='center'>
                                                    <Table.Cell data-label="Indication">
                                                        {this.state.appointment.indication}
                                                    </Table.Cell>
                                                    <Table.Cell data-label="Description">
                                                        {this.state.appointment.description}
                                                    </Table.Cell>
                                                    <Table.Cell data-label="SupportingInfo">
                                                        {this.state.appointment.supportingInfo}
                                                    </Table.Cell>
                                                    <Table.Cell data-label="Comments">
                                                        {this.state.appointment.comment}
                                                    </Table.Cell>

                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                        <Table padded celled>
                                            <Table.Header>
                                                <Table.Row textAlign='center'>
                                                    <Table.HeaderCell>Date</Table.HeaderCell>
                                                    <Table.HeaderCell>Time</Table.HeaderCell>
                                                    <Table.HeaderCell>Created</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                <Table.Row textAlign='center'>
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
                                                    <Table.Cell data-label="Created">
                                                        {this.state.appointment.start !== undefined
                                                            ? this.state.appointment.start.toLocaleDateString() +
                                                            " at " + this.state.appointment.start.toLocaleTimeString()
                                                            : ""}
                                                    </Table.Cell>

                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                        <Table padded celled>
                                            <Table.Header>
                                                <Table.Row textAlign='center'>
                                                    <Table.HeaderCell>Doctor</Table.HeaderCell>
                                                    <Table.HeaderCell>Patient</Table.HeaderCell>
                                                    <Table.HeaderCell>Location</Table.HeaderCell>

                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                <Table.Row textAlign='center'>
                                                    <Table.Cell data-label="Practitioner">
                                                        {this.state.appointment.practitioner}
                                                    </Table.Cell>
                                                    <Table.Cell data-label="Patient">
                                                        {this.state.appointment.patient}
                                                    </Table.Cell>
                                                    <Table.Cell data-label="Location">
                                                        {this.state.appointment.location}
                                                    </Table.Cell>

                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                        <Grid>
                                            <Grid.Row centered>
                                                <Button>Patient Info</Button>
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

    /*
identifier
status
appointmentType
indication
priority
description
supportingInformation
start
end
created
comment
participant (add one for patient, doctor and location)
    * */

    componentDidMount() {
        this.props.onChange();
    }
}

export default PractitionerCalendar;
