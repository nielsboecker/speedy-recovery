import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer>
        <div>Copyright (C) 2019 University College London</div>
        <div>
          Read our{" "}
          <a href="https://github.com/nbckr/speedy-recovery">Source Code</a> and{" "}
          <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">Licence</a>
        </div>
      </footer>
    );
  }
}

export default Footer;
