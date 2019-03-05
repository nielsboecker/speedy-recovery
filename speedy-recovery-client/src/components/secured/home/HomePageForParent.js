import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Loader } from "semantic-ui-react";

class HomePageForParent extends Component {
  render() {
    if (this.props.user && this.props.event && this.props.event.start && this.props.event.patient) {
      return (
        <div>
          <p>Hello {this.props.user.name}</p>
          {new Date(this.props.event.start).toLocaleString("en-uk") !==
          "Invalid Date" ? (
            <p>
              Here is the time for your child {this.props.event.patient}'s next
              appointment:{" "}
              <Link to={"/secured/calendar"}>
                {this.formatDate(this.props.event.start)}
              </Link>
            </p>
          ) : (
            <p>You dont't have any appointment</p>
          )}
        </div>
      );

    } else {
      return <Loader content="Loading" inline="centered" active size="large"/>;
    }

  }

  formatDate(date) {
    if (date) {
      return new Date(date).toLocaleString("en-uk");
    }
    return "Invalid date";
  }

}

export default HomePageForParent;
