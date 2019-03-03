import React, { Component } from "react";

class HomePageForPractitioner extends Component {
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
        appointmentTime: this.props.events.start,
        user: this.props.user,
        patient: this.props.patient
      });
    }, 1000);
  }

  render() {
    const { user, patient } = this.props;

    return (
      <div>
        <h3>Hello {user.name}</h3>
        <h4>This is practitioner's Homepage</h4>
      </div>
    );
  }
}

export default HomePageForPractitioner;
