import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Loader, Label, Icon } from "semantic-ui-react";

class HomePageForPatient extends Component {
  render() {
    if (dataIsReady(this.props.user, this.props.events)) {
      const nextEvent = getNextEvent(this.props.events);
      return (
        <div>
          <h1>Howdy, {this.props.user.firstName}!</h1>
          {new Date(nextEvent.start).toLocaleString("en-uk") !==
          "Invalid Date" ? (
            <p>
              Your next appointment is at{" "}
              <Label image color="yellow" as={Link} to={"/secured/calendar"}>
                <Icon name="calendar check" />
                {formatDate(nextEvent.start)}
                <Label.Detail as="span">{nextEvent.title}</Label.Detail>
              </Label>
            </p>
          ) : (
            <p>You dont't have any appointments upcoming. Lucky you, right?!</p>
          )}
        </div>
      );
    } else {
      return <Loader content="Loading" inline="centered" active size="large" />;
    }
  }
}
export function dataIsReady(user, events) {
  return (
    user && events && getNextEvent(events).patient && getNextEvent(events).start
  );
}

export function getNextEvent(events) {
  if (events.length > 0) {
    const event = events
      .filter(event => new Date(event.start) - new Date() > 0)
      .sort((a, b) => new Date(a.start) - new Date(b.start))[0];
    return event ? event : { start: [], patient: [] };
  } else {
    return "No event";
  }
}

export function formatDate(date) {
  if (date) {
    return new Date(date).toLocaleString("en-uk");
  }
  return "Invalid date";
}

export default HomePageForPatient;
