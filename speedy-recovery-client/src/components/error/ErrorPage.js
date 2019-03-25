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

/* This file defines the ErrorPage component, which is the page a user is sent to if they enter an invalid url or if
 * several other types of error occur.*/

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
