import React, { Component } from "react";
import "react-chat-elements/dist/main.css";
import { MessageList } from "react-chat-elements";
import { Input } from "react-chat-elements";
import { Button } from "react-chat-elements";

function handleClick(e) {
  e.preventDefault();
  console.log("The link was clicked.");
}

class ConversationPage extends Component {
  render() {
    return (
      <div>
        <h1>Conversation </h1>
        <MessageList
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={[
            {
              position: "right",
              type: "text",
              text: "Hey, there",
              date: new Date()
            },
            {
              position: "left",
              type: "text",
              text: "Hi",
              date: new Date()
            },
            {
              position: "right",
              type: "text",
              text: "woooooooooooooooooooooooooooooooooooooooooooooooow",
              date: new Date()
            },
            {
              position: "left",
              type: "photo",
              text: "react.svg",
              data: {
                uri: "https://facebook.github.io/react/img/logo.svg",
                status: {
                  click: false,
                  loading: 0
                }
              }
            }
          ]}
        />

        <Input
          placeholder="Type here..."
          multiline={true}
          backgroundColor="black"
          rightButtons={
            <Button
              color="white"
              style={{ height: 700 }}
              backgroundColor="black"
              onClick={handleClick}
              text="Send"
            />
          }
        />
      </div>
    );
  }
}

export default ConversationPage;
