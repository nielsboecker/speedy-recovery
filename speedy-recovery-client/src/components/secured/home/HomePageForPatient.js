import React, { Component } from "react";



class HomePageForPatient extends Component {

    constructor(props){
        super(props);

        this.state = {
            appointmentDate: {},
            user : {},


        }
    }
    componentWillMount() {
        setTimeout(()=>{this.setState({appointmentDate: this.props.events, user: this.props.user});},500);
    }

    render() {
        var test=new Date(this.state.appointmentDate.start).toLocaleDateString("en-uk");


    return (
      <div>
        <h1>Hello</h1>
        <h4>Welcome {this.state.user.name}</h4>
        <h4>This is patient's Homepage </h4>
        <h4>Here is you next appointment</h4>
          <h4>{test}</h4>

      </div>
    );
  }
}


export default HomePageForPatient;