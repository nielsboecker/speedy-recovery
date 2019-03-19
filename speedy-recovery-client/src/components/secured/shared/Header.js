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

/* This file defines Header component which creates the header at the top of each page.
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Container, Dropdown, Icon, Image, Label, Menu } from "semantic-ui-react";
import "./Header.css";
import { getConversation } from "../../../service/BackendService";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unreadNum: 0,
      id: ''
    };
  }

  render() {
    let showMessage;
    if (this.props.role !== "Patient") {
      showMessage = (
        <Menu.Item as={Link} to="/secured/messaging">
          <Icon name="mail" />
          Messages
          <Label color="teal" circular floating>
          {this.state.unreadNum}
          </Label>
        </Menu.Item>
      );
    }
    return (
      <header>
        <Menu borderless>
          <Container text>
            <Menu.Item header as={Link} to="/secured/home">
              <Image src="images/logo_square.png" size="mini" spaced="right" />
              Speedy Recovery
            </Menu.Item>
            <Menu.Item as={Link} to="/secured/calendar">
              <Icon name="calendar alternate" />
              Calendar
            </Menu.Item>

            {showMessage}

            <Menu.Item as={Link} to="/secured/patientinformation">
              Patient Information
            </Menu.Item>

            <Menu.Menu position="right">
              <Dropdown
                text={this.props.username}
                pointing
                className="link item"
              >
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/secured/profile">
                    <Icon name="user" />
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={this.props.onLogout}>
                    <Icon name="log out" />
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Container>
        </Menu>
      </header>
    );
  }

  componentDidMount() {
    if (this.props.role === "Practitioner"){
      let id = this.props.practitionerid;
      this.setState({ id });
    }
    if (this.props.role === "Parent"){
      let id = this.props.userid;
      this.setState({ id });

    }
    this.setMessageNum();
    this.timer = setInterval(() => {
      this.setMessageNum();
    }, 1000);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  setMessageNum = () => {
    if (this.props.role !== "Patient") {
      getConversation(this.state.id)
        .then(conversationResource => {
          let unreadNum = 0;
          for (let conversation of conversationResource){
            unreadNum += conversation.unread;
          }
          this.setState({ unreadNum });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

}

export default Header;
