import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomePageForPractitioner extends Component {
  static defaultProps = {
    event: {
      start: "no appointment time",
    }
  };

  render() {

    return (
      <div>
        <p>Hello {this.props.user.name}</p>
        {new Date(this.props.event.start).toLocaleString("en-uk") !==
        "Invalid Date" ? (
          <p>
            Here is the time for your patient {this.props.event.patient}'s next
            appointment:{" "}
            <Link to={"/secured/calendar"}>
              {new Date(this.props.event.start).toLocaleString("en-uk")}
            </Link>
          </p>
        ) : (
          <p>You dont't have any appointment</p>
        )}
      </div>
    );
  }
}

export default HomePageForPractitioner;
