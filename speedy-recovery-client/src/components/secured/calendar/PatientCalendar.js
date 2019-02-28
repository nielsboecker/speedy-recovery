import React from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.less";
import "./CalendarPages.css";
import { Grid, Segment, Card, Image, Icon, Dropdown } from "semantic-ui-react";

class PatientCalendar extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            doctorList: [],
            selected: "Doctor Name"
        };
    }

    getDoctorsInfo = () => {
        this.setState({doctorList:
            this.removeDuplicates(this.props.events.map(event => this.extractPractitioner(event))
                .filter(doctor => doctor.text !== "Unknown"))});
    };

    onChange = (e, data) => {
        console.log(data.value);
        this.setState({ selected: data.value });
    };

    removeDuplicates = array => array.reduce((prev, curr) =>
        prev.find(a => a["text"] === curr["text"]) ? prev : prev.push(curr) && prev, []);

    extractPractitioner = event => ({
      text: event.practitioner,
      value: event.practitioner
    });



    componentWillMount = () => {
        this.getDoctorsInfo();
    };

  render() {
    return (
      <Grid columns={2} divided>
          <Grid.Row>
        <Grid.Column>
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
                eventPropGetter={
                    (event, start, end, isSelected) => {
                        let newStyle = {
                            backgroundColor: "blue",
                            color: 'white',
                            borderRadius: "1px",
                            border: "yes"
                        };

                        if (event.isMine){
                            newStyle.backgroundColor = "lightgreen"
                        }

                        return {
                            className: "",
                            style: newStyle
                        };
                    }
                }
              />
            </div>
          </Segment>
        </Grid.Column>
              <Grid.Column>
                  <h2>My Doctors</h2>
                  <Dropdown placeholder='Select Doctor' fluid selection
                            options={this.state.doctorList}
                            onChange={this.onChange}/>
                  <Card>
                      <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                      <Card.Content>
                          <Card.Header>{this.state.selected}</Card.Header>
                          <Card.Meta>
                              <span className='Age'>55 years old</span>
                          </Card.Meta>
                          <Card.Description>Matthew supports Arsenal and has a dog named Pickles</Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                          <button>
                              <Icon name='user' />
                              22 Friends
                          </button>
                      </Card.Content>
                  </Card>
              </Grid.Column>
          </Grid.Row>
      </Grid>
    );
  }
}

export default PatientCalendar;
