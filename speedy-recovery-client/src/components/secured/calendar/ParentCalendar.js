import React from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.less";
import "./CalendarPages.css";
import { Grid, Segment, Modal, Table, Button } from "semantic-ui-react";

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
                                                    <Table.HeaderCell>Indication</Table.HeaderCell>
                                                    <Table.HeaderCell>Description</Table.HeaderCell>
                                                    <Table.HeaderCell>Status</Table.HeaderCell>
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
                                                    <Table.Cell data-label="Status">
                                                        {this.state.appointment.status}
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

    componentDidMount() {
        this.props.onChange();
    }
}

export default ParentCalendar;
