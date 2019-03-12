/*
* Speedy Recovery -- A patient-centred app based on the FHIR standard facilitating communication between paediatric
* patients, parents and hospital staff
*
* Copyright (C) 2019 University College London
*
* This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
* Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
* any later version.
* This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
* warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
* details.
* You should have received a copy of the GNU Affero General Public License along with this program. If not,
* see http://www.gnu.org/license/.
* */

/* This file defines the PractitionerModal component which creates a modal for each appointment with all of the
necessary information that a practitioner needs to know before the appointment
 */

import { Button, Modal, Table, Grid } from "semantic-ui-react";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class PractitionerModal extends Component {

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
                  <Table.HeaderCell>Appointment Id</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Appointment Type</Table.HeaderCell>
                  <Table.HeaderCell>Priority</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row textAlign="center">
                  <Table.Cell data-label="AppId">
                    {this.props.appointment.id}
                  </Table.Cell>
                  <Table.Cell data-label="Status">
                    {this.props.appointment.status}
                  </Table.Cell>
                  <Table.Cell data-label="AppType">
                    {this.props.appointment.appType}
                  </Table.Cell>
                  <Table.Cell data-label="Priority">
                    {this.props.appointment.priority}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Table padded celled>
              <Table.Header>
                <Table.Row textAlign="center">
                  <Table.HeaderCell>Indication</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell>Supporting Info</Table.HeaderCell>
                  <Table.HeaderCell>Comments</Table.HeaderCell>
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
                  <Table.Cell data-label="SupportingInfo">
                    {this.props.appointment.supportingInfo}
                  </Table.Cell>
                  <Table.Cell data-label="Comments">
                    {this.props.appointment.comment}
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
                <Button>
                  <Link
                    to={{
                      pathname: `/secured/conversation/${
                        this.props.appointment.patientId
                      }`,
                      state: {
                        id: this.props.id,
                        id2: this.props.appointment.patientId,
                        title: this.props.appointment.patient
                      }
                    }}
                    key={this.props.appointment.patientId}
                  >
                    Chat with this patient
                  </Link>
                </Button>
                <Button>Patient Info</Button>
              </Grid.Row>
            </Grid>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default PractitionerModal;
