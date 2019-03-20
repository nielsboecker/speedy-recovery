/*
* Speedy Recovery -- A patient-centred app based on the FHIR standard facilitating communication between paediatric
* patients, parents and hospital staff
*
* Copyright (C) 2019 University College London
*
* This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
* Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
* any later version.
* This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
* warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
* details.
* You should have received a copy of the GNU Affero General Public License along with this program. If not,
* see http://www.gnu.org/license/.
* */

/* This file defines the MessagingPage component which creates a summary page of the conversations a user has with
other users, allowing them to select one to continue speaking to someone.
 */

import React, { Component } from "react";
import "react-chat-elements/dist/main.css";
import { ChatItem } from "react-chat-elements";
import { Link } from "react-router-dom";
import { getConversation } from "../../../service/BackendService";
import { conversationMap } from "../../../service/BackendMapping";

class MessagingPage extends Component {
  _isMounted = false;

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
              title: conversation.title,
              role: this.props.user.role,
              name: this.props.user.name
            }
          }}
          key={conversation.userId}
        >
          {/*Creates messages summary page*/}
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
    this._isMounted = true;
    if (this.props.user && this.props.userList) {
      const id =
        this.props.user.role === "Parent"
          ? this.props.childID
          : this.props.user.id;
      this.setState({ id });
      this.fetchConversation(id);

      if (this._isMounted){
        this.timer = setInterval(() => {
          this.fetchConversation(id);
        }, 3000);  
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.timer && clearTimeout(this.timer);
  }

  // Fetch all of the conversations that this id has been part of
  fetchConversation(id) {
    getConversation(id)
      .then(conversationResource => {
        const conversations = conversationResource.map(conversation =>
          conversationMap(
            conversation,
            id,
            this.props.userList,
            this.state.dbType
          )
        );
        this.setState({ conversations });
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export default MessagingPage;
