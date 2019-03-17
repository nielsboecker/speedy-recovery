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

/* This file defines the PractitionerCalendar component which creates the practitioner view of the calendar
 */

import React from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.less";
import "../CalendarPages.css";
import { Grid, Segment } from "semantic-ui-react";
import PractitionerModal from "./PractitionerModal";
import {isBrowser, isTablet} from 'react-device-detect';

// list of all possible calendar views
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);
let mobileView = ["agenda"];

class PractitionerCalendar extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      //These are needed for modal
      appointment: [],
      isEditModalOpen: false
    };
  }

  // Toggle whether modal is open or closed
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
                defaultView={isBrowser || isTablet ? BigCalendar.Views.MONTH : BigCalendar.Views.AGENDA }
                defaultDate={new Date()}
                views={isBrowser || isTablet ? allViews : mobileView}
                ref={node => {
                  this.bigCalendarRef = node;
                }}
              />
              <PractitionerModal
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

export default PractitionerCalendar;
