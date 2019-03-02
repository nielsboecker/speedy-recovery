import React, { Component } from "react";
import "react-chat-elements/dist/main.css";
import { ChatItem } from "react-chat-elements";
import { Link } from "react-router-dom";
import {getConversation} from "../../../service/BackendService";

class MessagingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
    };
  }

  render() {
    const chatItems = this.state.conversations.map(conversation => {
      return (
          <Link
              to={{pathname:`/secured/conversation/${conversation.userId}`,
                  state:{id: this.props.id}}}
              key={conversation.userId}
             // state={this.props.id}
          >
            <ChatItem
                avatar={conversation.avatar}
                alt={conversation.alt}
                title={conversation.title}
                subtitle={conversation.subtitle}
                date={conversation.date}
                unread={conversation.unread}
            />
          </Link>
      );
    });

    return (
        <div>
          <h1>Messaging </h1>
          {chatItems}
        </div>
    );
  }

  componentDidMount() {
    getConversation(this.props.id)
      .then(conversations => {
        console.log("Checking : ", conversations);
        this.setState({ conversations });
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export default MessagingPage;
