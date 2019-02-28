import React, { Component, Fragment } from "react";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import HomePage from "../home/HomePage";
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
            />

            <Container>
              <Route path={`${match.url}`} exact
                     render={() => <HomePageFactory
                       user={this.props.user}
                       patient={this.props.patient}
                       event={this.props.appointments} />} />
              <Route path={`${match.url}/home`}
                     render={() => <HomePageFactory
                       user={this.props.user}
                       patient={this.props.patient}
                       event={this.props.appointments} />} />
              <Route
                path={`${match.url}/calendar`}
                render={() => (
                  <CalendarFactory
                    events={this.props.appointments}
                    role={this.props.user.role}
                  />
                )}
              />
              <Route
                path={`${match.url}/messaging`}
                component={MessagingPage}
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
