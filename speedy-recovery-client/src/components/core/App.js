import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Header from '../shared/Header';
import StartPage from '../start/StartPage';
import HomePage from '../home/HomePage';
import CalendarPage from '../calendar/CalendarPage';
import MessagingPage from '../messaging/MessagingPage';
import ProfilePage from '../profile/ProfilePage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Fragment>
            <Header/>

            <Route exact path="/" component={StartPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/calendar" component={CalendarPage} />
            <Route path="/messaging" component={MessagingPage} />
            <Route path="/profile" component={ProfilePage} />
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
