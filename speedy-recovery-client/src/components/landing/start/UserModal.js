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

/* This file defines the UserModal component that allows the ser to choose which of the three roles they fall under
**/

import React, { Component } from "react";
import { Button, Grid, Modal } from "semantic-ui-react";

class UserModal extends Component {
  render() {
    return (
      <Modal
        name="modal"
        size="mini"
        trigger={
          <Button
            color="teal"
            fluid
            size="large"
            name="login"
            className="button"
          >
            Log in
          </Button>
        }
      >
        <Modal.Header>Select user type</Modal.Header>
        <Modal.Content>
          <Grid centered>
            <Button.Group>
              <Button
                name="button1"
                color="teal"
                onClick={() => {
                  this.props.onLogin("Practitioner");
                }}
              >
                Practitioner
              </Button>
              <Button
                color="teal"
                onClick={() => {
                  this.props.onLogin("Parent");
                }}
              >
                Parent
              </Button>
              <Button
                color="teal"
                onClick={() => {
                  this.props.onLogin("Patient");
                }}
              >
                Patient
              </Button>
            </Button.Group>
          </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}

export default UserModal;
