import React, { Component } from "react";
import "react-chat-elements/dist/main.css";
import { MessageList } from "react-chat-elements";
import { Container, Form, TextArea, Grid, Button } from "semantic-ui-react";
import TestMessageData from "./test_files/messages.json";

function handleClick(e) {
  e.preventDefault();
  console.log("The link was clicked.");
}

class ConversationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  render() {
    return (
      <Container text>
        <h1>Conversation </h1>
        <MessageList
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={this.state.messages}
        />

        <Grid>
          <Grid.Row>
            <Grid.Column width={13}>
              <Form>
                <TextArea autoHeight placeholder="Hello Speedy" />
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Button primary onClick={handleClick}>
                Send
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }

  componentDidMount() {
    // TODO: Update state when data from back-end is available instead
    this.convertAndSetData(TestMessageData);
  }

  convertAndSetData(messageData) {
    // TODO: Access actual back-end data, consider missing values for optional fields
    const messages = messageData;
    this.setState({ messages });
  }
}

export default ConversationPage;
