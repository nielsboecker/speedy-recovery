import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Label,Icon, Loader} from "semantic-ui-react";
import {dataIsReady, formatDate, getNextEvent} from "./HomePageForPatient";

class HomePageForParent extends Component {
  render() {
    if (dataIsReady(this.props.user,this.props.events)) {
      const nextEvent = getNextEvent(this.props.events);
      return (
          <div>
            <h1>Howdy, {this.props.user.name}!</h1>
            {new Date(nextEvent.start).toLocaleString("en-uk") !==
            "Invalid Date" ? (
                <p>
                  Your child {nextEvent.patient}'s next appointment is at{" "}
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

export default HomePageForParent;
