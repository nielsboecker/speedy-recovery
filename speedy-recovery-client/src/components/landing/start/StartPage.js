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

/* This file defines the StartPage component which makes up the contents of the LandingMainPage component*/

import React, { Component } from "react";
import WelcomeBox from "./WelcomeBox";
import "./StartPage.css";
import { Grid, Image } from "semantic-ui-react";
import Footer from "./Footer";

class StartPage extends Component {
  render() {
    return (
      <div id="start-page" className="full-height">
        <Grid>
          <Grid.Row columns={1} only="mobile">
            <Grid.Column />
          </Grid.Row>
          <Grid.Row columns={1} only="computer tablet">
            <Grid.Column>
              <Image src="/images/gosh_logo.png" id="gosh-logo" />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid
          stackable
          verticalAlign="middle"
          columns={1}
          // centered
          className="full-height"
        >
          <Grid.Row centered>
            <Grid.Column>
              <WelcomeBox onLogin={this.props.onLogin} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default StartPage;
