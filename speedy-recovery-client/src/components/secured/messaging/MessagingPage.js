import React, { Component } from "react";
import "react-chat-elements/dist/main.css";
import { ChatItem } from "react-chat-elements";
import { Link } from "react-router-dom";
import {getConversation, mapConversations} from "../../../service/BackendService";

class MessagingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      id: null
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
              title: ": " + conversation.title
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
    if(this.props.user){
      const conversationList =
          this.props.user.role === "Parent"
              ? this.props.practitioners
              : this.props.patients;
      const id =
          this.props.user.role === "Parent" ? this.props.childID : this.props.user.id;
      this.setState({ id });
      getConversation(id)
          .then(conversationResource => {
            const conversations = conversationResource.map(conversation =>
                mapConversations(conversation, id, conversationList)
            );
            this.setState({ conversations });
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
}

export default MessagingPage;
