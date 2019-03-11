import React from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.less";
import "../CalendarPages.css";
import { Grid, Segment, Dropdown } from "semantic-ui-react";
import PatientPractitionerCard from "./PatientPractitionerCard";
import { getPractitionerInfo } from "../../../../service/BackendService";

class PatientCalendar extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      practitionerList: [],
      selectedPractitioner: undefined,
      backendInfo: undefined
    };
  }

  getPractitionerInfo = async () => {

    this.setState({
      practitionerList: this.props.patientPractitioners
    });
  };

  removeArrayDuplicates = array => array !== undefined ? array.reduce((prev, curr) =>
      prev.find(a => a["text"] === curr["text"]) ? prev : prev.push(curr) && prev, []) : array;

  getBackendInfo =  (practitionerID) => {
    const id = practitionerID;
    getPractitionerInfo(id)
        .then(response =>
            this.setState({backendInfo: response.data[0]})
        )
        .catch(error => console.log(error))
  };

  onDropdownChange = (e, data) => {
    this.getBackendInfo(data.value);
    this.setState({ selectedPractitioner:
          this.state.practitionerList.find(element => element.id ===
              data.value)});

  };

  componentWillMount = () => {
    this.getPractitionerInfo();
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
                        options={this.removeArrayDuplicates(this.props.events.map(event => {
                          return {text: event.practitioner, value: event.practitionerId}
                        }))
                        }
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