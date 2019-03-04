import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Container, Dropdown, Icon, Image, Label, Menu} from "semantic-ui-react";
import "./Header.css";

class Header extends Component {
  render() {
    let showMessage;
    if(this.props.role !== "Patient"){
       showMessage = <Menu.Item as={Link} to="/secured/messaging" >
       <Icon name="mail" />
       Messages
       <Label color="teal" circular floating>
         2
       </Label>
       </Menu.Item> 
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
}

export default Header;

