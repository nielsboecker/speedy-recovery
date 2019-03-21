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

/* This file defines the PatientPractitionerCard component which creates the practitioner information card which allows
a patient to see extra information about their practitioners in a fun way
 */

import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.less";
import "../CalendarPages.css";
import { Card, Image } from "semantic-ui-react";

class PatientPractitionerCard extends React.Component {
  render() {
    return (
      <Card centered>
        {/*Check whether a practitioner's image can be found, if not display a default image*/}
        {this.props.selectedPractitioner ? (
          this.props.selectedPractitioner.photo &&
          this.props.selectedPractitioner.photo !== "Unknown" ? (
            <Image
              src={
                "data:image/png;base64," + this.props.selectedPractitioner.photo
              }
            />
          ) : (
            <Image src={this.displayDefaultImage()} />
          )
        ) : (
          <Image src={this.displayDefaultImage()} />
        )}
        <Card.Content>
          {/*Display the first name of the practitioner*/}
          {this.props.selectedPractitioner ? (
            <Card.Header>
              {this.props.selectedPractitioner
                ? this.filterUndefined(
                    "name",
                    this.props.selectedPractitioner
                  ).split(" ")[0]
                : this.filterUndefined("name", this.props.selectedPractitioner)}
            </Card.Header>
          ) : (
            <p style={{ color: "black" }}>
              Please select a staff member from the list.
            </p>
          )}

          {this.props.selectedPractitioner ? (
            <Card.Meta>
              <span className="Hometown">
                {this.filterUndefined("hometown", this.props.backendInfo)}
              </span>
            </Card.Meta>
          ) : (
            ""
          )}
          {this.props.selectedPractitioner ? (
            <Card.Description>
              Supports :{" "}
              <b>
                {this.filterUndefined(
                  "favouriteFootballTeam",
                  this.props.backendInfo
                )}
              </b>{" "}
              <br />
              Favourite Food:{" "}
              <b>
                {this.filterUndefined("favouriteFood", this.props.backendInfo)}{" "}
              </b>
              <br />
              Favourite Animal:{" "}
              <b>
                {this.filterUndefined(
                  "favouriteAnimal",
                  this.props.backendInfo
                )}
              </b>
              <br />
              Gender:{" "}
              <b>
                {this.filterUndefined(
                  "gender",
                  this.props.selectedPractitioner
                )}
              </b>
              <br />
              Birthday:{" "}
              <b>
                {this.filterUndefined(
                  "birthDate",
                  this.props.selectedPractitioner
                )}
              </b>
              <br />
            </Card.Description>
          ) : (
            ""
          )}
        </Card.Content>
      </Card>
    );
  }

  //  Filter out any data that cannot be found
  filterUndefined = (field, object) => {
    return !object
      ? "Data not found"
      : object[field] !== "Unknown" && object[field]
      ? object[field]
      : "Data not found";
  };

  //  If image can't be found display a default image based on gender of practitioner
  displayDefaultImage = () => {
    return this.props.selectedPractitioner
      ? this.props.selectedPractitioner.gender === "female"
        ? require("../../../../defaultImages/femaleDoctor.jpg")
        : require("../../../../defaultImages/maleDoctor.png")
      : require("../../../../defaultImages/maleDoctor.png");
  };
}

export default PatientPractitionerCard;
