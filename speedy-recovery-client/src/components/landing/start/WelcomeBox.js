import React, { Component } from "react";
import { Button, Card, Container, Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react";
import "./WelcomeBox.css";
import Modal from "semantic-ui-react/dist/commonjs/modules/Modal";

class WelcomeBox extends Component {

  render() {
    return (
      <Container text>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Card>
              <Card.Content>
                <Header as="h2" color="teal" textAlign="center">
                  <Image src="/images/dummy_logo.png" size="small" /> Welcome to
                  Speedy Recovery
                </Header>
                <p>
                  Welcome to <strong>Great Ormond Street Hospital</strong>. Log
                  in to see your personal calendar and messages.
                </p>
              </Card.Content>

              <Card.Content>
                <Form size="large">
                  <Segment>


                    <Modal name="modal" size='mini' trigger={<Button color="teal"
                                            fluid
                                            size="large"
                                                        name="login"
                                            className="button">Log in</Button>}>
                      <Modal.Header>Select user type</Modal.Header>
                      <Modal.Content>
                        <Grid centered>
                          <Button.Group>
                            <Button name="button1" color="teal"
                                    onClick={() => {this.props.onLogin('Practitioner');}}
                                    >Practitioner</Button>
                            <Button color="teal"
                                    onClick={() => {this.props.onLogin('Parent');}}
                                    >Parent</Button>
                            <Button color="teal"
                                    onClick={() => {this.props.onLogin('Patient');}}
                                    >Patient</Button>
                          </Button.Group>
                        </Grid>
                      </Modal.Content>
                    </Modal>


                    <Button
                      color="teal"
                      fluid
                      size="large"
                      name="button2"
                      className="button"
                      onClick={() => alert("This functionality is not supported yet")}
                    >
                      Sign up
                    </Button>
                  </Segment>
                </Form>
              </Card.Content>

              <Card.Content>
                <Message>
                  Need help? <a href="/TODO">Click here!</a>
                </Message>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default WelcomeBox;
