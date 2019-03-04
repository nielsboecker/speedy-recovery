import React, { Component } from "react";
import "react-chat-elements/dist/main.css";
import { MessageList } from "react-chat-elements";
import { Container, Form, Grid, Button } from "semantic-ui-react";
import { getMessages, mapMessages, postMessages, setupMessages, getSenderMessageNum } from "../../../service/BackendService";

class ConversationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
      title: null
    };
  }

  handleChange = e => {
    this.setState({ message: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.message);
    postMessages(
      this.props.location.state.id,
      this.props.location.state.id2,
      this.state.message
    );
    const message = setupMessages(this.state.message);
    this.setState({ messages: [...this.state.messages, message] });
    this.setState({ message: "" });
  };

  render() {
    return (
      <Container text>
        <h1>Conversation {this.state.title}</h1>
        <MessageList
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={this.state.messages}
        />

        <Grid>
          <Grid.Row />
          <Grid.Row>
            <Grid.Column width={15}>
              <Form onSubmit={this.handleSubmit}>
                <input
                  placeholder="Text messages here"
                  value={this.state.message}
                  onChange={this.handleChange}
                />
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Button primary onClick={this.handleSubmit}>
                Send
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }

  componentDidMount() {
    this.setMessageList();
    this.timer = setInterval(() => {
      this.setMessageList();
    }, 3000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  setMessageList = () => {
    if (this.props.location) {
      this.setState({ title: this.props.location.state.title });
      getMessages(this.props.location.state.id, this.props.location.state.id2)
        .then(messagesResource => {
          const messages = messagesResource.map(message =>
            mapMessages(message, this.props.location.state.id)
          );
          if(getSenderMessageNum(messages) >= getSenderMessageNum(this.state.messages)){
            this.setState({ messages });
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
}

export default ConversationPage;
