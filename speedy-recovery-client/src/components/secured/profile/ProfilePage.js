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

/* This file defines the ProfilePage component which creates a profile page for each user displaying key information
about them.
 */

import React, { Component} from "react";
import { Grid, Icon, Table } from "semantic-ui-react";

class ProfilePage extends Component {
  render() {
    return (
      <Grid verticalAlign="middle" columns={3} centered>
        <Grid.Row>
          <Grid.Column width={12}>
            <h1>Profile</h1>
            <Table definition color="blue">
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={4}>
                  <Icon name="user" color="blue" />
                  Name 
                  </Table.Cell>
                  <Table.Cell> {this.props.user.name}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                  <Icon name="mail" color="blue" />Email
                  </Table.Cell>
                  <Table.Cell>{this.props.user.email}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                  <Icon name="phone" color="blue"/>
                    Phone
                    </Table.Cell>
                  <Table.Cell>
                   
                    {this.props.user.phone}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ProfilePage;
