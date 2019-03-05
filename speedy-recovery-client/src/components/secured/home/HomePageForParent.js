import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Loader } from "semantic-ui-react";


class HomePageForParent extends Component {
  render() {
    if (this.props.user && this.props.events &&
      this.getNextEvent(this.props.events).start&&
      this.getNextEvent(this.props.events).patient) {
      return (
        <div>
          <p>Hello {this.props.user.name}</p>
          {new Date(this.getNextEvent(this.props.events).start).toLocaleString("en-uk") !==
          "Invalid Date" ? (
            <p>
              Here is the time for your child {this.getNextEvent(this.props.events).patient}'s next
              appointment:{" "}
              <Link to={"/secured/calendar"}>
                {this.formatDate(this.getNextEvent(this.props.events).start)}
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

  getNextEvent(events){
    const event=events.filter(event => new Date(event.start) - new Date() > 0)
      .sort((a, b) => new Date(a.start) - new Date(b.start))[0];
    return (event?event:{start:[]});
  }

  formatDate(date) {
    if (date) {
      return new Date(date).toLocaleString("en-uk");
    }
    return "Invalid date";
  }


}

export default HomePageForParent;
