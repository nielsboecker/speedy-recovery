import React, { Component, Fragment } from "react";
import Header from "../shared/Header";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import HomePage from "../home/HomePage";
import MessagingPage from "../messaging/MessagingPage";
import ProfilePage from "../profile/ProfilePage";
import ConversationPage from "../conversation/ConversationPage";
import { mapAppointment } from "../../../dataaccess/FhirDataAdapter";
import CalendarFactory from "../calendar/CalendarFactory";
import fhirExampleApp from "../../../__tests__/test_input/fhir_r3/FhirExampleAppointments.json";

class SecuredMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
    };
  }

  render() {
    if (!this.props.user) {
      return <Redirect to="/"/>;
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
              <Route path={`${match.url}`} exact component={HomePage}/>
              <Route path={`${match.url}/home`} component={HomePage}/>
              <Route path={`${match.url}/calendar`}
                     render={() => (
                         <CalendarFactory
                           events={this.state.appointments}
                           onChange={this.updateStateAppointments}
                           role={"Patient"}
                         />
                     )}
              />
              <Route
                path={`${match.url}/messaging`}
                component={MessagingPage}
              />
              <Route
                path={`${match.url}/profile`}
                render={() => (
                  <ProfilePage
                    user={this.props.user}
                  />
                )}
              />
              <Route
                path={`${match.url}/conversation`}
                component={ConversationPage}
              />
            </Container>
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }

  componentWillMount() {
    this.updateStateAppointments();
  }

  updateStateAppointments = () => {
    // TODO: Query SMART, display appointment data for current user
    const appointments = fhirExampleApp.map(mapAppointment);
    this.setState({ appointments });
  };
}

export default SecuredMainPage;
