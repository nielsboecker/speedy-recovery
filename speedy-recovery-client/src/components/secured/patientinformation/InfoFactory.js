import React, { Component } from "react";
import PatientInfo from "./PatientInfo";
import PractitionerInfo from "./PractitionerInfo";
import ParentInfo from "./ParentInfo";


class InfoFactory extends Component {
   
   render() { 
        const {user, patient} = this.props;

     switch(user.role) {
            case 'Patient':
                return <PatientInfo user = {user}/>;
            case 'Parent':
                return <ParentInfo user = {user}/>;
            case 'Practitioner':
                return <PractitionerInfo user = {user}  patient = {patient}/>;
            default:
                return undefined;
        }
    }
}

export default InfoFactory;