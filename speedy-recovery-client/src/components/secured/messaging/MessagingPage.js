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



class MessagingPage extends Component {
    render() {
        return (
            <div>
                <h1>Messaging </h1>
                <ChatItem
                avatar={'https://lh3.googleusercontent.com/-Jj0RugpS_sc/AAAAAAAAAAI/AAAAAAAAAAA/ACevoQNVh0Q0O4khfQoRCS9UKA_yT3B65A/s96-c-mo/photo.jpg'}
                alt={'Reactjs'}
                title={'Chong Yang'}
                subtitle={'What are you doing?'}
                date={new Date()}
                unread={0} />



                <Link to={"/secured/conversation"}>
                <ChatItem 
                avatar={'https://abs.twimg.com/a/1548278062/img/t1/grey_header_web.jpg'}
                alt={'Reactjs'}
                title={'dada'}
                subtitle={'What are you doing?'}
                date={new Date()}
                unread={0} />
                </Link>
                

                <ChatItem
                avatar={'https://lh3.googleusercontent.com/-Jj0RugpS_sc/AAAAAAAAAAI/AAAAAAAAAAA/ACevoQNVh0Q0O4khfQoRCS9UKA_yT3B65A/s96-c-mo/photo.jpg'}
                alt={'Reactjs'}
                title={'Facebook'}
                subtitle={'What are you doing?'}
                date={new Date()}
                unread={0} />

                <ChatItem
                avatar={'https://ksassets.timeincuk.net/wp/uploads/sites/55/2017/10/placeholder.jpg'}
                alt={'Reactjs'}
                title={'Trump'}
                subtitle={'What are you doing?'}
                date={new Date(2019,1,24,15,30)}
                unread={0} />                

                <ChatItem
                avatar={'https://ksassets.timeincuk.net/wp/uploads/sites/55/2016/10/etRMuIWJ-150x150.jpg'}
                alt={'Reactjs'}
                title={'Facebook'}
                subtitle={'What are you doing?'}
                date={new Date(2018,1,3,15,30)}
                unread={0} />

                <ChatItem
                avatar={'https://pbs.twimg.com/profile_images/725013638411489280/4wx8EcIA_400x400.jpg'}
                alt={'Reactjs'}
                title={'Trump'}
                subtitle={'What are you doing?'}
                date={new Date(2017,1,3,15,30)}
                unread={0} />

                <Link to={"/secured/conversation"}>
                <ChatItem 
                avatar={'https://pbs.twimg.com/profile_images/725013638411489280/4wx8EcIA_400x400.jpg'}
                alt={'Reactjs'}
                title={'dada'}
                subtitle={'What are you doing?'}
                date={new Date(2016,1,3,15,30)}
                unread={0} />
                </Link>
                

                <ChatItem

                avatar={'https://ksassets.timeincuk.net/wp/uploads/sites/55/2017/03/simpsons-the-great-phatsby-1.jpg'}
                alt={'Reactjs'}
                title={'Facebook'}
                subtitle={'What are you doing?'}
                date={new Date(2015,1,3,15,30)}
                unread={0} />

            </div>
        );
    }
}

export default MessagingPage;