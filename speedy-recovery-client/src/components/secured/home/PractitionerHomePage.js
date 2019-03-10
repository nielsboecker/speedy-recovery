import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon, Label, Loader } from "semantic-ui-react";
import { dataIsReady, getNextEvent } from "./HomePageDataUtils";
import { formatDate } from "../../../service/DateUtils";

class PractitionerHomePage extends Component {
  render() {
    if (dataIsReady(this.props.user, this.props.events)) {
      const nextEvent = getNextEvent(this.props.events);
      return (
        <div>
          <h1>Hello, {this.props.user.firstName}!</h1>
          {new Date(nextEvent.start).toLocaleString("en-uk") !==
          "Invalid Date" ? (
            <p>
              Your patient {nextEvent.patient}'s next appointment is at{" "}
              <Label image color="yellow" as={Link} to={"/secured/calendar"}>
                <Icon name="calendar check" />
                {formatDate(nextEvent.start)}
                <Label.Detail as="span">{nextEvent.title}</Label.Detail>
              </Label>
            </p>
          ) : (
            <p>You dont't have any appointments upcoming.</p>
          )}
        </div>
      );
    } else {
      return <Loader content="Loading" inline="centered" active size="large" />;
    }
  }
}

export default PractitionerHomePage;
