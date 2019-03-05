import React from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.less";
import "./CalendarPages.css";
import axios from 'axios';
import { Grid, Segment, Card, Image, Dropdown } from "semantic-ui-react";
import FhirDataQueryingService from "../../../service/FhirDataQueryingService";

class PatientCalendar extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            doctorList: [],
            dropdownList: [],
            selectedDoctor: "",
            extraInfo: undefined,
            practInfo: undefined
        };
    }

    getDoctorsInfo = () => {
        this.props.events.map(event => {
            const family = event.practitioner.split(' ');
            const id = event.practitionerId.substring(13, event.practitionerId.length);
            return this.getPractInfo(event, id, family[family.length - 1]);
        });
        this.setState({
            dropdownList:
                this.removeDuplicates(this.props.events.map(event => {
                    return {text: event.practitioner, value: event.practitionerId}
                }))
        });
    };

    getPractInfo = (event, practId, familyName) =>
        FhirDataQueryingService.getPracitionerInfo(practId, familyName)
            .then(practitionerResource => {

                    this.state.doctorList.push( {name: event.practitioner,
                            id: event.practitionerId,
                            info: practitionerResource.resource.name[0].family,
                            gender: practitionerResource.resource.gender,
                            birthDate: practitionerResource.resource.birthDate
                    });

            })
            .catch(error => {
                console.error(error);
            });


    getExtraInfo =  (practitionerID) => {
        const id = practitionerID.substring(13, practitionerID.length);
        axios.get('https://speedy-recovery-server.azurewebsites.net/practitioners?userid=' + id)
            .then(response => this.setState({extraInfo: response.data[0]}))
            .catch(error => console.log("No extra info: " + error ));

    };


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
        this.setState({ selectedDoctor: this.state.doctorList.find(element => element.id === data.value) });
    };

    removeDuplicates = array => array.reduce((prev, curr) =>
        prev.find(a => a["text"] === curr["text"]) ? prev : prev.push(curr) && prev, []);

    render() {
        return (
            <Grid columns={2} divided>
                <Grid.Row stretched>
                    <Grid.Column color={'green'}>
                        <h2 align="center">My Appointments</h2>
                        <Segment >
                            <div style={{ height: 500 }}>
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
                        {/*<Segment>*/}
                        <h2 align="center">My Doctors</h2>
                        <Dropdown placeholder='Select Doctor' fluid selection
                                  options={this.state.dropdownList}
                                  onChange={this.onChange}/>
                        <Card centered>
                            <Image src={require('../../../tempImages/maleDoctor.png')} />
                            <Card.Content>
                                <Card.Header>{this.state.selectedDoctor !== undefined ? this.state.selectedDoctor.text : ""}</Card.Header>
                                <Card.Meta>
                                    <span className='Hometown'>{this.filterUndefined().hometown}</span>
                                </Card.Meta>
                                <Card.Description>
                                    Supports: <b>{this.filterUndefined().favouriteFootballTeam}</b><br />
                                    Favourite Food: <b>{this.filterUndefined().favouriteFood} </b><br />
                                    Favourite Animal: <b>{this.filterUndefined().favouriteAnimal}</b><br />
                                    Gender: <b>{this.state.selectedDoctor !== undefined ? this.state.selectedDoctor.gender : "Data not found"}</b><br />
                                    DOB: <b>{this.state.selectedDoctor !== undefined ? this.state.selectedDoctor.birthDate : "Data not found"}</b>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                        {/*</Segment>*/}
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        );
    }

    filterUndefined = () => {
        return this.state.extraInfo !== undefined ?  this.state.extraInfo :  "Data not found";
    }
}

export default PatientCalendar;