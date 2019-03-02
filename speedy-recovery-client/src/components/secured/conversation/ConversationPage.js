import React, { Component } from "react";
import "react-chat-elements/dist/main.css";
import { MessageList } from "react-chat-elements";
import { Container, Form, TextArea, Grid, Button } from "semantic-ui-react";
import { getMessages, mapMessages} from "../../../service/BackendService";

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
    getMessages( this.props.location.state.id)
        .then(messagesResource => {
          console.log("Checking : ", messagesResource);
          const messages = messagesResource.map(message => mapMessages(message, this.props.location.state.id))
          console.log("Checking : ", messages);
          this.setState({ messages });
        })
        .catch(error => {
          console.error(error);
        });
  }
}

export default ConversationPage;
