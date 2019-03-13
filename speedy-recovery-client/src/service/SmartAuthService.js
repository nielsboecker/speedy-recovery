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

/* This file configures the sandbox based on the type of user logging in.
 */

/*global FHIR */
import "fhirclient/fhir-client";
import smartProviderConfig from "../config/smartProviderConfig";
import smartPatientConfig from "../config/smartPatientConfig";
import smartParentConfig from "../config/smartParentConfig";

const startSmartAuthenticatedSession = user => {
  console.log("Starting SmartAuthenticatedSession");

  var config = undefined;
  const errorCallback = error => console.error(error);

  //Depending on users role choose which sandbox configuration to use
  switch (user) {
    case "Practitioner":
      config = smartProviderConfig;
      break;
    case "Patient":
      config = smartPatientConfig;
      break;
    case "Parent":
      config = smartParentConfig;
      break;
    default:
      console.log("Authentication Error");
  }
  FHIR.oauth2.authorize(config, errorCallback);
};

const onSmartAuthenticatedSessionReady = () => {
  return new Promise((resolve, reject) => {
    FHIR.oauth2.ready(
      response => {
        console.log("Smart auth response: ", response);
        return resolve(response);
      },
      error => {
        console.error("Smart auth error: ", error);
        return reject(error);
      }
    );
  });
};

const endSmartAuthenticatedSession = () => {
  console.log("Ending SmartAuthenticatedSession");
  sessionStorage.clear();
};

export default {
  startSmartAuthenticatedSession,
  onSmartAuthenticatedSessionReady,
  endSmartAuthenticatedSession
};
