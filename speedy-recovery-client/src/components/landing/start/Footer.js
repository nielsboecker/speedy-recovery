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

/* This file defines the footer that appears at the bottom of each page of the application*/

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
