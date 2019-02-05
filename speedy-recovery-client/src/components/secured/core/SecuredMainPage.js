import React, { Component, Fragment } from "react";
import Header from "../shared/Header";
import { BrowserRouter, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import HomePage from "../home/HomePage";
import CalendarPage from "../calendar/CalendarPage";
import MessagingPage from "../messaging/MessagingPage";
import ProfilePage from "../profile/ProfilePage";
import ConversationPage from "../conversation/ConversationPage";
import fhirExamplePatient from "../../../__tests__/test_input/fhir_r3/FhirExamplePatient.json";
import { mapPatientToUser, mapAppointment } from "../../../dataaccess/FhirDataAdapter";
import fhirExampleAppointments from "../../../__tests__/test_input/fhir_r3/FhirExampleAppointments.json";

class SecuredMainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      events: [],
    };
  }

  updateStateUser = () => {
    // TODO: Access actual FHIR data, consider missing values for optional fields
    const user = mapPatientToUser(fhirExamplePatient);
    this.setState({ user });
  };

  updateStateAppointments = () => {
    const events = fhirExampleAppointments.map(mapAppointment);
    this.setState({ events });
  };

  render() {
    const { match } = this.props;

    return (
      <div>
        <BrowserRouter>
          <Fragment>
            <Header/>

            <Container>
              <Route path={`${match.url}`} exact component={HomePage}/>
              <Route path={`${match.url}/home`} component={HomePage}/>
              <Route path={`${match.url}/calendar`}
                     render={() => (
                         <CalendarPage
                             events={this.state.events}
                             onChange={this.updateStateAppointments}
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
                    user={this.state.user}
                    onChange={this.updateStateUser}
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
}

export default SecuredMainPage;
