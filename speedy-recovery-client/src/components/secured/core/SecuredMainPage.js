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
                    patient={this.props.patient}
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
                    patient={this.props.patient}
                    conditions={this.props.conditions}
                    medicationDispenses={this.props.medicationDispenses}
                    carePlans={this.props.carePlans}
                  />
                )}
              />
              <Route
                path={`${match.url}/conversation`}
                component={ConversationPage}
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
