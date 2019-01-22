import React, {Component, Fragment} from 'react';
import Header from '../shared/Header';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "../home/HomePage";
import CalendarPage from "../calendar/CalendarPage";
import MessagingPage from "../messaging/MessagingPage";
import ProfilePage from "../profile/ProfilePage";

class SecuredMainPage extends Component {
    render() {
        return (

            <div>
                <Router>
                    <Fragment>
                        <Header/>

                        <Route path={`${this.props.match.url}`} exact component={HomePage} />
                        <Route path={`${this.props.match.url}/home`} component={HomePage} />
                        <Route path={`${this.props.match.url}/calendar`} component={CalendarPage} />
                        <Route path={`${this.props.match.url}/messaging`} component={MessagingPage} />
                        <Route path={`${this.props.match.url}/profile`} component={ProfilePage} />
                    </Fragment>
                </Router>
            </div>
        );
    }
}

export default SecuredMainPage;