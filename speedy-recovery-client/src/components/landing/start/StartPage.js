import React, { Component } from "react";
import WelcomeBox from "./WelcomeBox";
import "./StartPage.css";
import { Grid, Image } from "semantic-ui-react";
import Footer from "./Footer";

class StartPage extends Component {
  render() {
    return (
      <div id="start-page" className="full-height">
        <Image src="/images/gosh_logo.png" id="gosh-logo" />

        <Grid
          verticalAlign="middle"
          columns={3}
          centered
          className="full-height"
        >
          <Grid.Row>
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
