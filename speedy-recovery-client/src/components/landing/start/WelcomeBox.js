import React, { Component } from "react";
import { Button, Card, Container, Form, Grid, Image, Message, Segment } from "semantic-ui-react";
import "./WelcomeBox.css";
import UserModal from "./UserModal";

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
                <Image src="images/logo_with_title.png" fluid/>
                <p>
                  Welcome to <strong>Great Ormond Street Hospital</strong>. Log
                  in to see your personal calendar and messages.
                </p>
              </Card.Content>

              <Card.Content>
                <Form size="large">
                  <Segment>
                    <UserModal onLogin={this.props.onLogin}/>
                    <Button
                      color="teal"
                      fluid
                      size="large"
                      name="button2"
                      className="button"
                      onClick={() =>
                        alert("This functionality is not supported yet")
                      }
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
