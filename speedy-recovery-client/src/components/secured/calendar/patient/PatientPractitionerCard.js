import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.less";
import "../CalendarPages.css";
import { Card, Image } from "semantic-ui-react";

class PatientPractitionerCard extends React.Component {

    render() {
        return (
            <Card centered>
                {this.props.selectedPractitioner ?
                    this.props.selectedPractitioner.photo  &&
                    this.props.selectedPractitioner.photo !== "Unknown" ?
                        <Image src={"data:image/png;base64," + this.props.selectedPractitioner.photo}/>
                        : <Image src={this.displayDefaultImage()}/>
                    : <Image src={this.displayDefaultImage()}/>
                }
                <Card.Content>
                    <Card.Header>{this.props.selectedPractitioner ? this.filterUndefined("name",
                        this.props.selectedPractitioner).split(" ")[0]
                        : this.filterUndefined("name",
                            this.props.selectedPractitioner)
                    }</Card.Header>

                    {this.props.selectedPractitioner ?
                        <Card.Meta>
                        <span className='Hometown'>{this.filterUndefined("hometown",
                            this.props.backendInfo)}</span>
                        </Card.Meta>
                        : ""}
                    {this.props.selectedPractitioner ?
                        < Card.Description >
                        Supports : <b>{this.filterUndefined("favouriteFootballTeam",
                        this.props.backendInfo)}</b> < br />
                        Favourite Food: <b>{this.filterUndefined("favouriteFood",
                        this.props.backendInfo)} </b><br/>
                        Favourite Animal: <b>{this.filterUndefined("favouriteAnimal",
                        this.props.backendInfo)}</b><br/>
                        Gender: <b>{this.filterUndefined("gender",
                        this.props.selectedPractitioner)}</b><br/>
                        Birthday: <b>{this.filterUndefined("birthDate",
                        this.props.selectedPractitioner)}</b><br/>
                        </Card.Description>
                        : ""
                    }
                </Card.Content>
            </Card>
        );
    }

  filterUndefined = (field, object) => {
    return !object
      ? "Data not found"
      : object[field] !== "Unknown" && object[field]
      ? object[field]
      : "Data not found";
  };

  displayDefaultImage = () => {
      return this.props.selectedPractitioner ?
          this.props.selectedPractitioner.gender === 'female' ?
              require('../../../../defaultImages/femaleDoctor.jpg')
              : require('../../../../defaultImages/maleDoctor.png')
          : require('../../../../defaultImages/maleDoctor.png')
  }
}

export default PatientPractitionerCard;
