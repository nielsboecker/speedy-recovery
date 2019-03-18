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

/* This file defines the PatientCalendar component which creates the patient view of the calendar
 */

import React from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.less";
import "../CalendarPages.css";
import { Dropdown, Grid, Segment } from "semantic-ui-react";
import PatientPractitionerCard from "./PatientPractitionerCard";
import { getPractitionerInfo } from "../../../../service/BackendService";

class PatientCalendar extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      practitionerList: [],
      selectedPractitioner: undefined,
      backendInfo: undefined
    };
  }

  // Store the list of practitioners that were queried from the patient's appointments
  getPractitionerInfo = () => {
    this.setState({
      practitionerList: this.props.patientPractitioners
    });
  };

  removeArrayDuplicates = array =>
    array !== undefined
      ? array.reduce(
      (prev, curr) =>
        prev.find(a => a["text"] === curr["text"])
          ? prev
          : prev.push(curr) && prev,
      []
      )
      : array;

  // Retrieve extra practitioner info from the back-end
  getBackendInfo =  (practitionerID) => {
    getPractitionerInfo(practitionerID)
      .then(response =>
        this.setState({backendInfo: response.data[0]})
      )
      .catch(error => console.log(error))
  };

  onDropdownChange = (e, data) => {
    this.getBackendInfo(data.value);
    this.setState({ selectedPractitioner:
        this.state.practitionerList.find(element => element.id ===
          data.value)});
  };

  componentWillMount = () => {
    this.getPractitionerInfo();
  };

  render() {
    const styled = {
      agenda: {
        backgroundColor: "#4285F4"
      }
    };

    return (
      <Grid columns={2} divided>
        <Grid.Row stretched>
          <Grid.Column color={"green"}>
            <h2 align="center">My Appointments</h2>
            <Segment>
              <div style={{ height: 500 }}>
                <BigCalendar
                  localizer={this.props.localizer}
                  events={this.props.events}
                  onSelectEvent={this.toggleEditModal}
                  //Only display the agenda view of the calendar
                  defaultView={BigCalendar.Views.AGENDA}
                  defaultDate={new Date()}
                  views={["agenda"]}
                  ref={node => {
                    this.bigCalendarRef = node;
                  }}
                  style={styled.agenda}
                />
              </div>
            </Segment>
          </Grid.Column>
          <Grid.Column color={"yellow"}>
            <h2 align="center">My Doctors</h2>
            <Dropdown
              placeholder="Select Doctor"
              fluid
              selection
              options={this.removeArrayDuplicates(
                this.props.events.map(event => {
                  return {
                    text: event.practitioner,
                    value: event.practitionerId
                  };
                })
              )}
              onChange={this.onDropdownChange}
            />
            <PatientPractitionerCard
              selectedPractitioner={this.state.selectedPractitioner}
              backendInfo={this.state.backendInfo}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default PatientCalendar;
