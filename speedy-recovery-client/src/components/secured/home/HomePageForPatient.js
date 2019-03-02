import React, { Component } from "react";
import {NavLink} from "react-router-dom";



class HomePageForPatient extends Component {

    constructor(props) {
        super(props);

        this.state = {
            appointmentTime: {},
            user: {},


        }
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({appointmentTime: this.props.events.start, user: this.props.user});
        }, 1000);
    }

    render() {
        return (
            <div>
                <h1>Hello</h1>
                <h4>Welcome {this.state.user.name}</h4>
                <h4>This is patient's Homepage </h4>
                <h4>Here is your next appointment:<NavLink to={`secured/calender`}> {new Date(this.state.appointmentTime).toLocaleString("en-uk")}</NavLink></h4>


            </div>
        );
    }

}

export default HomePageForPatient;