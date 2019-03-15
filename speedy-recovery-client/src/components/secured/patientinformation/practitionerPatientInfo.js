/*
* Speedy Recovery -- A patient-centred app based on the FHIR standard facilitating communication between paediatric
* patients, parents and hospital staff
*
* Copyright (C) 2019 University College London
*
* This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
* Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
* any later version.
* This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
* warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
* details.
* You should have received a copy of the GNU Affero General Public License along with this program. If not,
* see http://www.gnu.org/license/.
* */

import React, { Component } from "react";
import FhirDataQueryingService from "../../../service/FhirDataQueryingService";
import {fhirMapCarePlan, fhirMapCondition, fhirMapMedicationDispense} from "../../../service/FhirDataMappingService";

class practitionerPatientInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patient:{},
            conditions: [],
            medicationDispenses: [],
            carePlans: []
        }
    }

    render() {
        return (
            <div>
                <h1>Patient Information For Parent View</h1>
                <h4>Name: {this.props.location.state.patient.name}</h4>
            </div>
        );
    }

    componentWillMount() {
        if(this.props.location){
            this.updateStateCondition(this.props.location.state.patient.id);
            this.updateStateMedicationDispense(this.props.location.state.patient.id);
            this.updateStateCarePlan(this.props.location.state.patient.id);
        }
    }

    updateStateCondition(userId) {
        FhirDataQueryingService.getUserConditions(userId)
            .then(conditionResource => {
                const conditions = conditionResource.map(condition =>
                    fhirMapCondition(condition, this.props.location.state.fhirVersion)
                );
                this.setState({ conditions });
            })
            .catch(error => {
                console.error(error);
            });
    }

    updateStateMedicationDispense(userId) {
        FhirDataQueryingService.getUserMedicationDispense(userId)
            .then(medicationResource => {
                const medicationDispenses = medicationResource.map(medication =>
                    fhirMapMedicationDispense(medication, this.props.location.state.fhirVersion)
                );
                this.setState({ medicationDispenses });
            })
            .catch(error => {
                console.error(error);
            });
    }

    updateStateCarePlan(userId) {
        FhirDataQueryingService.getUserCarePlan(userId)
            .then(carePlanResource => {
                const carePlans = carePlanResource.map(carePlan =>
                    fhirMapCarePlan(carePlan, this.props.location.state.fhirVersion)
                );
                this.setState({carePlans});
            })
            .catch(error => {
                console.error(error);
            });
    }
}

export default practitionerPatientInfo;
