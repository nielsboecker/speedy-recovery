import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon, Label, Loader } from "semantic-ui-react";
import { dataIsReady, formatDate, getNextEvent } from "./PatientHomePage";

class ParentHomePage extends Component {
  render() {
    if (dataIsReady(this.props.user, this.props.events)) {
      const nextEvent = getNextEvent(this.props.events);
      return (
        <div>
          <h1>Hello, {this.props.user.firstName}!</h1>
          {new Date(nextEvent.start).toLocaleString("en-uk") !==
          "Invalid Date" ? (
            <p>
              Your child {nextEvent.patient}'s appointment is at{" "}
              <Label image color="yellow" as={Link} to={"/secured/calendar"}>
                <Icon name="calendar check" />
                {formatDate(nextEvent.start)}
                <Label.Detail as="span">{nextEvent.title}</Label.Detail>
              </Label>
            </p>
          ) : (
            <p>Your child does not have any appointments upcoming.</p>
          )}
        </div>
      );
    } else {
      return <Loader content="Loading" inline="centered" active size="large" />;
    }
  }
}

export default ParentHomePage;
