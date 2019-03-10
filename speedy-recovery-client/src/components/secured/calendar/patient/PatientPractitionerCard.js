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
                        : <Image src={require('../../../../defaultImages/maleDoctor.png')}/>
                    : <Image src={require('../../../../defaultImages/femaleDoctor.jpg')}/>
                }
                <Card.Content>
                    <Card.Header>{this.filterUndefined("text",
                                            this.props.selectedPractitioner)}</Card.Header>
                    <Card.Meta>
                        <span className='Hometown'>{this.filterUndefined("hometown",
                                                                        this.props.backendInfo)}</span>
                    </Card.Meta>
                    <Card.Description>
                        Supports: <b>{this.filterUndefined("favouriteFootballTeam",
                                                                        this.props.backendInfo)}</b><br/>
                        Favourite Food: <b>{this.filterUndefined("favouriteFood",
                                                                        this.props.backendInfo)} </b><br/>
                        Favourite Animal: <b>{this.filterUndefined("favouriteAnimal",
                                                                        this.props.backendInfo)}</b><br/>
                        Gender: <b>{this.filterUndefined("gender",
                                                                        this.props.selectedPractitioner)}</b><br/>
                        Birthday: <b>{this.filterUndefined("birthDate",
                                                                        this.props.selectedPractitioner)}</b><br/>
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }

    filterUndefined = (field, object) => {
        return !object ?  "Data not found" :
                object[field] !== "Unknown" && object[field] ?
                object[field] : "Data not found";
    };
}

export default PatientPractitionerCard;