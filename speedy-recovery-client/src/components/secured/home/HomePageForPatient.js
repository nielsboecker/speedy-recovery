import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Loader, Label, Icon } from "semantic-ui-react";

class HomePageForPatient extends Component {
  render() {
    if (this.dataIsReady()) {
      const nextEvent = this.getNextEvent();
      return (
        <div>
          <h1>Howdy, {this.props.user.name}!</h1>
          {new Date(nextEvent.start).toLocaleString("en-uk") !==
          "Invalid Date" ? (
            <p>
              Your next appointment is at{" "}
              <Label image color="yellow" as={Link} to={"/secured/calendar"}>
                <Icon name="calendar check" />
                {this.formatDate(nextEvent.start)}
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

  dataIsReady() {
    return (
      this.props.user &&
      this.props.events &&
      this.getNextEvent(this.props.events).start &&
      this.getNextEvent(this.props.events).patient
    );
  }

  getNextEvent() {
    const event = this.props.events
      .filter(event => new Date(event.start) - new Date() > 0)
      .sort((a, b) => new Date(a.start) - new Date(b.start))[0];
    return event ? event : { start: [] };
  }

  formatDate(date) {
    if (date) {
      return new Date(date).toLocaleString("en-uk");
    }
    return "Invalid date";
  }
}

export default HomePageForPatient;
