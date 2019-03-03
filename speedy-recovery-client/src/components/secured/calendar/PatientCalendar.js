import React from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.less";
import "./CalendarPages.css";
import axios from 'axios';
import { Grid, Segment, Card, Image, Dropdown } from "semantic-ui-react";

class PatientCalendar extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            doctorList: [],
            selectedDoctor: "",
            extraInfo: undefined
        };
    }

    getDoctorsInfo = () => {
        this.setState({doctorList:
            this.removeDuplicates(this.props.events.map(event => {
                                                        return this.extractPractitioner(event)
            }))});
    };



    getExtraInfo =  (practitionerID) => {
        const id = practitionerID.substring(13, practitionerID.length);
         axios.get('https://speedy-recovery-server.azurewebsites.net/practitioners?userid=' + id)
             .then(response => this.setState({extraInfo: response.data[0]}))
             .catch(error => console.log("No extra info: " + error ));

    };

    extractPractitioner = event => ({
      text: event.practitioner,
      value: event.practitionerId
    });

    componentWillMount = () => {
        this.getDoctorsInfo();
    };

    styled = {
        agenda:{
            backgroundColor: '#4285F4',
            color: 'white',
            font: "bold"
}

    };

    onChange = (e, data) => {
        this.getExtraInfo(data.value);
        this.setState({ selectedDoctor: data });
    };

    removeDuplicates = array => array.reduce((prev, curr) =>
        prev.find(a => a["text"] === curr["text"]) ? prev : prev.push(curr) && prev, []);

    render() {

        return (
      <Grid columns={2} divided>
          <Grid.Row>
        <Grid.Column color={'green'}>
            <h2 align="center">My Appointments</h2>
          <Segment>
            <div style={{ height: 450 }}>
              <BigCalendar
                localizer={this.props.localizer}
                events={this.props.events}
                onSelectEvent={this.toggleEditModal}
                defaultView={BigCalendar.Views.AGENDA}
                defaultDate={new Date()}
                views={["agenda"]}
                ref={node => {
                  this.bigCalendarRef = node;
                }}
                style={this.styled.agenda}
              />
            </div>
          </Segment>
        </Grid.Column>
              <Grid.Column color={'yellow'}>
                  <h2 align="center">My Doctors</h2>
                  <Dropdown placeholder='Select Doctor' fluid selection
                            options={this.state.doctorList}
                            onChange={this.onChange}/>
                  <Card centered>
                      <Image src={require('../../../tempImages/maleDoctor.png')} />
                      <Card.Content>
                          <Card.Header>{this.state.selectedDoctor !== undefined ? this.state.selectedDoctor.text : ""}</Card.Header>
                          <Card.Meta>
                              <span className='Hometown'>{this.filterUndefined().Hometown}</span>
                          </Card.Meta>
                          <Card.Description>
                              Supports: <b>{this.filterUndefined().FavouriteFootballTeam}</b><br />
                              Favourite Food: <b>{this.filterUndefined().FavouriteFood} </b><br />
                              Favourite Animal: <b>{this.filterUndefined().FavouriteAnimal}</b>
                          </Card.Description>
                      </Card.Content>
                  </Card>
              </Grid.Column>
          </Grid.Row>
      </Grid>
    );
  }

  filterUndefined = () => {
      return this.state.extraInfo !== undefined ?  this.state.extraInfo :  "";
  }
}


export default PatientCalendar;
