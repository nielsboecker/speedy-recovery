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

/* This file defines the PractitionerInfo component which creates an information page containing detailed information
about each of the practitioners' patients.
 */

import React, { Component } from "react";
import {Link} from "react-router-dom";

class PractitionerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: []
        };
    }

    render() {
            const patientItems = this.state.userList.map(patient => {
                return (
                    <Link
                        to={{
                            pathname: `/secured/information/${patient.id}`,
                            state: {
                                id: patient.id,
                                name: patient.name,
                                fhirVersion : this.props.fhirVersion
                            }}}
                        key={patient.id}>
                        <h3> {patient.name} </h3>
                    </Link>
                );});
        return (
            <div>
                <h1>My patients: </h1>
                {patientItems}
            </div>
        );
    }
    componentWillMount() {
        if(this.props.userList){
            this.setState({userList: this.props.userList});
        }
    }
}

export default PractitionerInfo;
