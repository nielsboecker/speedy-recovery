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

/* This file defines the SecuredMainPage component which controls where the user is routed to once they have entered
the secure part of the application.
 */

import React, { Component, Fragment } from "react";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import MessagingPage from "../messaging/MessagingPage";
import ProfilePage from "../profile/ProfilePage";
import ConversationPage from "../conversation/ConversationPage";
import InfoFactory from "../patientinformation/InfoFactory";
import CalendarFactory from "../calendar/CalendarFactory";
import HomePageFactory from "../home/HomePageFactory";
import practitionerPatientInfo from "../patientinformation/practitionerPatientInfo";

class SecuredMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: []
    };
  }

  render() {
    if (!this.props.user) {
      return <Redirect to="/" />;
    }

    const { match } = this.props;

    return (
      //  Routes the user to their selected page
      <div>
        <BrowserRouter>
          <Fragment>
            <Header
              username={this.props.user.name}
              onLogout={this.props.onLogout}
              role={this.props.user.role}
            />

            <Container>
              <Route
                path={`(${match.url}|${match.url}/home)`}
                exact
                render={() => (
                  <HomePageFactory
                    user={this.props.user}
                    events={this.props.appointments}
                  />
                )}
              />
              <Route
                path={`${match.url}/calendar`}
                render={() => (
                  <CalendarFactory
                    events={this.props.appointments}
                    role={this.props.user.role}
                    fhirVersion={this.props.fhirVersion}
                    patientPractitioners={this.props.patientPractitioners}
                    childID={this.props.childID}
                    id={this.props.user.id}
                  />
                )}
              />
              <Route
                path={`${match.url}/messaging`}
                render={() => (
                  <MessagingPage
                    user={this.props.user}
                    userList={this.props.userList}
                    childID={this.props.childID}
                  />
                )}
              />
              <Route
                path={`${match.url}/profile`}
                render={() => <ProfilePage user={this.props.user} />}
              />
              <Route
                path={`${match.url}/patientinformation`}
                render={() => (
                  <InfoFactory
                    user={this.props.user}
                    patients={this.props.patients}
                    conditions={this.props.conditions}
                    medicationDispenses={this.props.medicationDispenses}
                    carePlans={this.props.carePlans}
                    fhirVersion={this.props.fhirVersion}
                  />
                )}
              />
              <Route
                path={`${match.url}/conversation`}
                component={ConversationPage}
              />
              <Route
                  path={`${match.url}/information`}
                  component={practitionerPatientInfo}
              />
            </Container>
            <Footer />
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default SecuredMainPage;
