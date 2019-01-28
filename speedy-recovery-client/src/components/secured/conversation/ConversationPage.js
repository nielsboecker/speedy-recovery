// Follow the following link for setup
// https://www.npmjs.com/package/react-chat-elements

// tool to install in order to run this file
// npm install --save react-bootstrap

import React, {Component} from 'react';
// RCE CSS
import 'react-chat-elements/dist/main.css';
// // MessageBox component
import { MessageBox } from 'react-chat-elements';
// MessageBox component
import { ChatItem } from 'react-chat-elements';
import { SystemMessage } from 'react-chat-elements';
import { MessageList } from 'react-chat-elements';
import { ChatList } from 'react-chat-elements';
import { Input } from 'react-chat-elements';
// import ReactDOM from 'react-dom';
// import { Button} from 'react-bootstrap';
import { Button } from 'react-chat-elements'
import { Popup } from 'react-chat-elements'

import { SideBar } from 'react-chat-elements'
import { Navbar } from 'react-chat-elements'
import { Dropdown } from 'react-chat-elements'
import { Avatar } from 'react-chat-elements'
import { LocationMessage } from 'react-chat-elements'
import { BrowserRouter as Router, Link } from "react-router-dom";


function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
}

class ConversationPage extends Component {
    render() {
        return (
            <div>
                <h1>Conversation </h1>
                <MessageList
                className='message-list'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={[
                    {
                        position: 'right',
                        type: 'text',
                        text: 'Hey, there',
                        date: new Date(),

                    },
                    {
                        position: 'left',
                        type: 'text',
                        text: 'Hi',
                        date: new Date(),
                    },
                    {
                        position: 'right',
                        type: 'text',
                        text: 'woooooooooooooooooooooooooooooooooooooooooooooooow',
                        date: new Date(),
                    },
                    {
                        position: 'left',
                        type: 'photo',
                        text: 'react.svg',
                        data: {
                        uri: 'https://facebook.github.io/react/img/logo.svg',
                        status: {
                            click: false,
                            loading: 0,
                        }}
                    }

                ]} />

            <Input
                placeholder="Type here..."
                multiline={true}
                backgroundColor='black'
                rightButtons={
                    <Button
                        color='white'
                        style={{height: 700}}
                        backgroundColor='black'
                        onClick={handleClick}
                        text='Send'/
                        >
                }/>
                
            </div>
        );
    }
}

export default ConversationPage;