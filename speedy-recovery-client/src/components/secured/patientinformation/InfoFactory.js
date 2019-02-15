import React, { Component} from "react";
import PatientInfo from "./PatientInfo";
import PractitionerInfo from "./PractitionerInfo";
import ParentInfo from "./ParentInfo";


class InfoFactory extends Component {
   
   render() { 
        const userResources = this.props.user;
        console.log(" Mapped Resources for user from info fatory", userResources);
        const patResource = this.props.patResource;
        console.log(" Mapped Resources for patient from info fatory", patResource);
        const role = userResources.role;
        
        console.log(role);
        // conditional rendering
        switch(role) {
            case 'Patient':
                return <PatientInfo user = {userResources}/>;
            case 'Parent':
                return <ParentInfo user = {userResources}/>;
            case 'Practitioner':
                return <PractitionerInfo user = {userResources}  extraInfo = {patResource}/>;
            default:
                return undefined;
        }
    }
}

export default InfoFactory;