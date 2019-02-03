import React, { Component } from "react";
import "react-chat-elements/dist/main.css";
import { ChatItem } from "react-chat-elements";
import { Link } from "react-router-dom";
import TestConversationData from "./test_files/conversations";

class MessagingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: []
    };
  }

  render() {
    const chatItems = this.state.conversations.map(conversation => {
      return (
        <Link to={`/secured/conversation/${conversation.userId}`} key={conversation.userId}>
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
    // TODO: Update state when data from back-end is available instead
    this.convertAndSetData(TestConversationData);
  }

  convertAndSetData(conversationData) {
    // TODO: Access actual back-end data, consider missing values for optional fields
    const conversations = conversationData;
    this.setState({ conversations });
  }
}

export default MessagingPage;
