import React, { Component } from "react";
import "react-chat-elements/dist/main.css";
import { ChatItem } from "react-chat-elements";
import { Link } from "react-router-dom";
import axios from 'axios';

class MessagingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      data_from_request: ""
    };
  }

  render() {
    const chatItems = this.state.conversations.map(conversation => {
      return (
          <Link
              to={`/secured/conversation/${conversation.userId}`}
              key={conversation.userId}
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
    this.convertAndSetData();
  }

  async convertAndSetData() {
    console.log(this.props.id);
    var url = 'https://speedy-recovery-server.azurewebsites.net/conversations?userid=' + this.props.id;
    const res = await axios.get(url);
    console.log(res);
    this.setState({ conversations: res.data });
  }
}

export default MessagingPage;
