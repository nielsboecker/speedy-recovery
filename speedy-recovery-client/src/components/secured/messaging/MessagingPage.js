import React, { Component } from "react";
import "react-chat-elements/dist/main.css";
import { ChatItem } from "react-chat-elements";
import { Link } from "react-router-dom";
import {getConversation} from "../../../service/BackendService";
import {conversationMap} from "../../../service/BackendMapping";


class MessagingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      id: null,
      dbType: "MySQL"
    };
  }

  render() {
    const chatItems = this.state.conversations.map(conversation => {
      return (
        <Link
          to={{
            pathname: `/secured/conversation/${conversation.userId}`,
            state: {
              id: this.state.id,
              id2: conversation.userId,
              title: conversation.title
            }
          }}
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
    if(this.props.user && this.props.userList){
      const id = this.props.user.role === "Parent" ? this.props.childID : this.props.user.id;
      this.setState({ id });
      this.fetchConversation(id);
    }
  }

  fetchConversation(id){
    getConversation(id)
    .then(conversationResource => {
      const conversations = conversationResource.map(conversation =>
        conversationMap(conversation, id, this.props.userList, this.state.dbType)
      );
      this.setState({ conversations });
    })
    .catch(error => {
      console.error(error);
    });
  }

}

export default MessagingPage;
