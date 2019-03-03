import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomePageForParent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appointmentTime: {},
      user: {},
      patient: {}
    };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        appointmentTime: this.props.event.start,
        user: this.props.user,
        patient: this.props.event.patient
      });
    }, 1000);
  }
  render() {
    return (
      <div>
        <h3>Hello {this.state.user.name}</h3>
        {new Date(this.state.appointmentTime).toLocaleString("en-uk") !==
        "Invalid Date" ? (
          <h4>
            Here is the time for your child {this.state.patient}'s next
            appointment:{" "}
            <Link to={"/secured/calendar"}>
              {new Date(this.state.appointmentTime).toLocaleString("en-uk")}
            </Link>
          </h4>
        ) : (
          <h4>You dont't have any appointment</h4>
        )}
      </div>
    );
  }
}

export default HomePageForParent;
