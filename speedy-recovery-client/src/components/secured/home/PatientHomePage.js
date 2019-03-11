import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon, Label, Loader } from "semantic-ui-react";
import { dataIsReady, getNextEvent } from "./HomePageDataUtils";
import { formatDate, isValidDate } from "../../../service/DateUtils";

class PatientHomePage extends Component {
  render() {
    if (dataIsReady(this.props.user, this.props.events)) {
      const nextEvent = getNextEvent(this.props.events);
      return (
        <div>
          <h1>Howdy, {this.props.user.firstName}!</h1>
          {isValidDate(nextEvent.start) ? (
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

export default PatientHomePage;
