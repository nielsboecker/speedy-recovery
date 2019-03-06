import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.less";
import "../CalendarPages.css";
import { Card, Image } from "semantic-ui-react";

class PatientPractitionerCard extends React.Component {
    
    render() {
        return (
            <Card centered>
                {this.props.selectedPractitioner !== undefined ?
                    this.props.selectedPractitioner.photo !== undefined &&
                    this.props.selectedPractitioner.photo !== "Unknown" ?
                        <Image src={"data:image/png;base64," + this.props.selectedPractitioner.photo}/>
                        : <Image src={require('../../../../defaultImages/maleDoctor.png')}/>
                    : <Image src={require('../../../../defaultImages/femaleDoctor.jpg')}/>
                }
                <Card.Content>
                    <Card.Header>{this.filterSelectedPractitionerUndefined("text")}</Card.Header>
                    <Card.Meta>
                        <span className='Hometown'>{this.filterBackendUndefined("hometown")}</span>
                    </Card.Meta>
                    <Card.Description>
                        Supports: <b>{this.filterBackendUndefined("favouriteFootballTeam")}</b><br/>
                        Favourite Food: <b>{this.filterBackendUndefined("favouriteFood")} </b><br/>
                        Favourite Animal: <b>{this.filterBackendUndefined("favouriteAnimal")}</b><br/>
                        Gender: <b>{this.filterSelectedPractitionerUndefined("gender")}</b><br/>
                        DOB: <b>{this.filterSelectedPractitionerUndefined("birthDate")}</b><br/>
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }

    filterBackendUndefined = (field) => {
        return this.props.backendInfo === undefined ? "" :
            this.props.backendInfo[field] !== undefined ?
                this.props.backendInfo[field] : "Data not found";
    };

    filterSelectedPractitionerUndefined = (field) => {
        return this.props.selectedPractitioner === undefined ?  "" :
            this.props.selectedPractitioner[field] !== "Unknown" ?
                this.props.selectedPractitioner[field] : "Data not found";
    };
}

export default PatientPractitionerCard;