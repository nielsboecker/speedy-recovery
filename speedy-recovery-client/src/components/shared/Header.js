import React, {Component} from 'react';
import {
    Container,
    Dropdown,
    Image,
    Menu
} from 'semantic-ui-react'

const menuStyle = {
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    marginBottom: '1em',
    marginTop: '4em',
    transition: 'box-shadow 0.5s ease, padding 0.5s ease',
};

class Header extends Component {
    render() {
        return (
            <header>
                <Menu
                    borderless
                    style={menuStyle}
                >
                    <Container text>
                        <Menu.Item>
                            <Image size='mini' src='https://react.semantic-ui.com/logo.png' />
                        </Menu.Item>
                        <Menu.Item header>Speedy Recovery</Menu.Item>
                        <Menu.Item as='a'>Calendar</Menu.Item>
                        <Menu.Item as='a'>Messages</Menu.Item>

                        <Menu.Menu position='right'>
                            <Dropdown text='Robert Smith' pointing className='link item'>
                                <Dropdown.Menu>
                                    <Dropdown.Item>My Profile</Dropdown.Item>
                                    <Dropdown.Item>Log Out</Dropdown.Item>
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