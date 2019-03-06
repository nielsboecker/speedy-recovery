import React from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.less";
import "../CalendarPages.css";
import axios from 'axios';
import { Grid, Segment, Dropdown } from "semantic-ui-react";
import FhirDataQueryingService from "../../../../service/FhirDataQueryingService";
import {filterPractitionerResource} from "../../../../service/FhirDataFilteringService";
import {fhirMapPractitioner} from "../../../../service/FhirDataMappingService";
import PatientPractitionerCard from "./PatientPractitionerCard";

class PatientCalendar extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            practitionerList: [],
            dropdownList: [],
            selectedPractitioner: undefined,
            backendInfo: undefined
        };
    }

    getDoctorsInfo = () => {
        this.props.events.map(event => {
            const family = event.practitioner.split(' ');
            const id = event.practitionerId.substring(13, event.practitionerId.length);
            return this.queryPractInfo(id, family[family.length - 1]);
        });
        this.setState({
            dropdownList:
                this.removeArrayDuplicates(this.props.events.map(event => {
                    return {text: event.practitioner, value: event.practitionerId}
                }))
        });
    };

    removeArrayDuplicates = array => array.reduce((prev, curr) =>
        prev.find(a => a["text"] === curr["text"]) ? prev : prev.push(curr) && prev, []);

    queryPractInfo = (practId, familyName) =>
        FhirDataQueryingService.getPracitionerInfo(practId, familyName)
            .then(practitionerResource => {

                const filteredPractitionerResource = filterPractitionerResource(practitionerResource.resource);
                if (filteredPractitionerResource) {

                    const practitioner = fhirMapPractitioner(
                        filteredPractitionerResource,
                        this.props.fhirVersion
                    );

                    this.state.practitionerList.push(practitioner);
                } else {
                    console.error(
                        "Crucial information missing from resource: ",
                        practitionerResource
                    );
                }
            })
            .catch(error => {
                console.error(error);
            });


    getBackendInfo =  (practitionerID) => {
        const id = practitionerID.substring(13, practitionerID.length);
        axios.get('https://speedy-recovery-server.azurewebsites.net/practitioners?userid=' + id)
            .then(response => {this.setState({backendInfo: response.data[0]});}
            )
            .catch(error => console.log("No extra info: " + error ));
    };

    onDropdownChange = (e, data) => {
        this.getBackendInfo(data.value);
        this.setState({ selectedPractitioner: this.state.practitionerList.find(element => element.id === data.value.substring(13, data.value.length)) });
    };

    componentWillMount = () => {
        this.getDoctorsInfo();
    };

    render() {
        const styled = {
            agenda:{
                backgroundColor: '#4285F4',
            }
        };

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
                                    style={styled.agenda}
                                />
                            </div>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column color={'yellow'}>
                        <h2 align="center">My Doctors</h2>
                        <Dropdown placeholder='Select Doctor' fluid selection
                                  options={this.state.dropdownList}
                                  onChange={this.onDropdownChange}/>
                        <PatientPractitionerCard
                            selectedPractitioner={this.state.selectedPractitioner}
                            backendInfo={this.state.backendInfo}/>
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        );
    }
}

export default PatientCalendar;