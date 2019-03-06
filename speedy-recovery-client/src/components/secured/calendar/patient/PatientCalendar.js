import React from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.less";
import "../CalendarPages.css";
import axios from "axios";
import { Grid, Segment, Card, Dropdown, Image } from "semantic-ui-react";
import FhirDataQueryingService from "../../../../service/FhirDataQueryingService";
import { filterPractitionerResource } from "../../../../service/FhirDataFilteringService";
import { fhirMapPractitioner } from "../../../../service/FhirDataMappingService";

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
      const family = event.practitioner.split(" ");
      const id = event.practitionerId.substring(
        13,
        event.practitionerId.length
      );
      return this.getPractInfo(id, family[family.length - 1]);
    });
    this.setState({
      dropdownList: this.removeDuplicates(
        this.props.events.map(event => {
          return { text: event.practitioner, value: event.practitionerId };
        })
      )
    });
  };

  getPractInfo = (practId, familyName) =>
    FhirDataQueryingService.getPracitionerInfo(practId, familyName)
      .then(practitionerResource => {
        const filteredPractitionerResource = filterPractitionerResource(
          practitionerResource.resource
        );
        if (filteredPractitionerResource) {
          const practitioner = fhirMapPractitioner(
            filteredPractitionerResource,
            this.props.fhirVersion
          );

          this.state.doctorList.push(practitioner);
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

  getExtraInfo = practitionerID => {
    const id = practitionerID.substring(13, practitionerID.length);
    axios
      .get(
        "https://speedy-recovery-server.azurewebsites.net/practitioners?userid=" +
          id
      )
      .then(response => {
        this.setState({ extraInfo: response.data[0] });
      })
      .catch(error => console.log("No extra info: " + error));
  };

  componentWillMount = () => {
    this.getDoctorsInfo();
  };

  styled = {
    agenda: {
      backgroundColor: "#4285F4",
      color: "white",
      font: "bold"
    }
  };

  onChange = (e, data) => {
    this.getExtraInfo(data.value);
    this.setState({
      selectedDoctor: this.state.doctorList.find(
        element => element.id === data.value.substring(13, data.value.length)
      )
    });
  };

  removeDuplicates = array =>
    array.reduce(
      (prev, curr) =>
        prev.find(a => a["text"] === curr["text"])
          ? prev
          : prev.push(curr) && prev,
      []
    );

  render() {
    return (
      <Grid columns={2} divided>
        <Grid.Row stretched>
          <Grid.Column color={"green"}>
            <h2 align="center">My Appointments</h2>
            <Segment>
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
          <Grid.Column color={"yellow"}>
            <h2 align="center">My Doctors</h2>
            <Dropdown
              placeholder="Select Doctor"
              fluid
              selection
              options={this.state.dropdownList}
              onChange={this.onChange}
            />
            <Card centered>
              {this.state.selectedDoctor !== undefined ? (
                this.state.selectedDoctor.photo !== undefined &&
                this.state.selectedDoctor.photo !== "Unknown" ? (
                  <Image
                    src={
                      "data:image/png;base64," + this.state.selectedDoctor.photo
                    }
                  />
                ) : (
                  <Image
                    src={require("../../../../defaultImages/maleDoctor.png")}
                  />
                )
              ) : (
                <Image
                  src={require("../../../../defaultImages/femaleDoctor.jpg")}
                />
              )}
              <Card.Content>
                <Card.Header>
                  {this.state.selectedDoctor !== undefined
                    ? this.state.selectedDoctor.text
                    : ""}
                </Card.Header>
                <Card.Meta>
                  <span className="Hometown">
                    {this.filterUndefined().hometown}
                  </span>
                </Card.Meta>
                <Card.Description>
                  Supports:{" "}
                  <b>{this.filterUndefined().favouriteFootballTeam}</b>
                  <br />
                  Favourite Food: <b>{this.filterUndefined().favouriteFood} </b>
                  <br />
                  Favourite Animal:{" "}
                  <b>{this.filterUndefined().favouriteAnimal}</b>
                  <br />
                  Gender:{" "}
                  <b>
                    {this.state.selectedDoctor !== undefined
                      ? this.state.selectedDoctor.gender
                      : "Data not found"}
                  </b>
                  <br />
                  DOB:{" "}
                  <b>
                    {this.state.selectedDoctor !== undefined
                      ? this.state.selectedDoctor.birthDate
                      : "Data not found"}
                  </b>
                  <br />
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  filterUndefined = () => {
    return this.state.extraInfo !== undefined
      ? this.state.extraInfo
      : "Data not found";
  };
}

export default PatientCalendar;
