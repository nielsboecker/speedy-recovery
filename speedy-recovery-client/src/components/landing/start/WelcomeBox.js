import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Container,
  Card
} from "semantic-ui-react";
import "./WelcomeBox.css";
import SmartAuthService from "../../../service/SmartAuthService"

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
                    <Button
                      color="teal"
                      fluid
                      size="large"
                      className="button"
                      onClick={this.handleLoginClick}
                    >
                      Log in
                    </Button>
                    <Button
                      color="teal"
                      fluid
                      size="large"
                      className="button"
                      as={Link}
                      to="/TODO"
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

  handleLoginClick() {
    SmartAuthService.startSmartAuthenticatedSession();
  }
}

export default WelcomeBox;
