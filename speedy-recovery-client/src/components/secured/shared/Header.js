import React, {Component} from 'react';
import {
    Container,
    Dropdown,
    Image,
    Menu,
    Icon,
    Label
} from 'semantic-ui-react'
import './Header.css';

class Header extends Component {
    render() {
        return (
            <header>
                <Menu borderless>
                    <Container text>
                        <Menu.Item>
                            <Image size='mini' src='https://react.semantic-ui.com/logo.png' />
                        </Menu.Item>
                        <Menu.Item header>Speedy Recovery</Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='calendar alternate' />
                            Calendar
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <Icon name='mail' />
                             Messages
                            <Label color='teal' circular floating>
                                2
                            </Label>
                        </Menu.Item>

                        <Menu.Menu position='right'>
                            <Dropdown text='Robert Smith' pointing className='link item'>
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Icon name='user' />
                                        My Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Icon name='log out' />
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