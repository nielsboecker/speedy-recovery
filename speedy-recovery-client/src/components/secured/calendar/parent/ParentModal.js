import { Button, Modal, Table, Grid } from "semantic-ui-react";
import React, { Component } from "react";

class ParentModal extends Component {
  render() {
    return (
      <Modal
        open={this.props.isEditModalOpen}
        onOpen={this.props.toggleEditModal}
        closeIcon
        onClose={this.props.toggleEditModal}
      >
        <Modal.Header>
          Appointment Details - {this.props.appointment.patient}
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Table padded celled>
              <Table.Header>
                <Table.Row textAlign="center">
                  <Table.HeaderCell>Indication</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row textAlign="center">
                  <Table.Cell data-label="Indication">
                    {this.props.appointment.indication}
                  </Table.Cell>
                  <Table.Cell data-label="Description">
                    {this.props.appointment.description}
                  </Table.Cell>
                  <Table.Cell data-label="Status">
                    {this.props.appointment.status}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Table padded celled>
              <Table.Header>
                <Table.Row textAlign="center">
                  <Table.HeaderCell>Date</Table.HeaderCell>
                  <Table.HeaderCell>Time</Table.HeaderCell>
                  <Table.HeaderCell>Created</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row textAlign="center">
                  <Table.Cell data-label="Date">
                    {this.props.appointment.start !== undefined
                      ? this.props.appointment.start.toLocaleDateString()
                      : ""}
                  </Table.Cell>
                  <Table.Cell data-label="Time">
                    {this.props.appointment.start !== undefined
                      ? this.props.appointment.start.toLocaleTimeString()
                      : ""}
                  </Table.Cell>
                  <Table.Cell data-label="Created">
                    {this.props.appointment.start !== undefined
                      ? this.props.appointment.start.toLocaleDateString() +
                        " at " +
                        this.props.appointment.start.toLocaleTimeString()
                      : ""}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Table padded celled>
              <Table.Header>
                <Table.Row textAlign="center">
                  <Table.HeaderCell>Doctor</Table.HeaderCell>
                  <Table.HeaderCell>Patient</Table.HeaderCell>
                  <Table.HeaderCell>Location</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row textAlign="center">
                  <Table.Cell data-label="Practitioner">
                    {this.props.appointment.practitioner}
                  </Table.Cell>
                  <Table.Cell data-label="Patient">
                    {this.props.appointment.patient}
                  </Table.Cell>
                  <Table.Cell data-label="Location">
                    {this.props.appointment.location}
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
    );
  }
}

export default ParentModal;
