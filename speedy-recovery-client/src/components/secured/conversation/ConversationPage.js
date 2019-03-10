import React, { Component } from "react";
import "react-chat-elements/dist/main.css";
import { MessageList } from "react-chat-elements";
import { Form, Grid, Button} from "semantic-ui-react";
import { getMessages, postMessages} from "../../../service/BackendService";
import { messageMap, setupMessages, getSenderMessageNum } from "../../../service/BackendMapping";
import "./ConversationPage.css";

class ConversationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
      title: null,
      dbType: "MySQL"
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
      <div>
        <h3 className ="topTitle"><i className="user icon"></i>{this.state.title}</h3>
        <div className= "showList">
          <MessageList
              className="message-list"
              lockable={true}
              toBottomHeight={"100%"}
              dataSource={this.state.messages}
            />
            <Grid textAlign="center">
              <Grid.Row />
              <Grid.Row>
                <Grid.Column width={12}>
                  <Form onSubmit={this.handleSubmit} className="messageField">
                    <input 
                      placeholder="Text messages here"
                      value={this.state.message}
                      onChange={this.handleChange}
                    />
                  </Form>
                </Grid.Column>
                <Grid.Column>
                  <Button color="red" onClick={this.handleSubmit}>
                    Send
                  </Button>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row />
            </Grid>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.setMessageList();
    this.timer = setInterval(() => {
      this.setMessageList();
    }, 3000);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  setMessageList = () => {
    if (this.props.location) {
      this.setState({ title: this.props.location.state.title});
      getMessages(this.props.location.state.id, this.props.location.state.id2)
        .then(messagesResource => {
          const messages = messagesResource.map(message =>
            messageMap(message, this.props.location.state.id, this.state.dbType)
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
