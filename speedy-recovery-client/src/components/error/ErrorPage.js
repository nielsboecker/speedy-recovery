import React, { Component } from "react";
import { Button, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";

class ErrorPage extends Component {
  render() {
    const { error } = this.props;

    const returnButton = (
      <Button
        color="teal"
        fluid
        size="large"
        className="button"
        onClick={() => this.props.resetError && this.props.resetError()}
        as={Link}
        to="/"
      >
        Return to home page
      </Button>
    );

    return (
      <div>
        <h1>Something went wrong</h1>

        <Message negative size="massive">
          <Message.Header>{error.rootCause}</Message.Header>
          <p>{error.message}</p>
        </Message>

        {error.resolvable && returnButton}
      </div>
    );
  }
}

export default ErrorPage;
