/*global FHIR */
import "fhirclient/fhir-client";
import smartProviderConfig from "../config/smartProviderConfig";
import smartPatientConfig from "../config/smartPatientConfig";
import smartParentConfig from "../config/smartParentConfig";

const startSmartAuthenticatedSession = user => {
  console.log("Starting SmartAuthenticatedSession");

  var config = undefined;

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
  FHIR.oauth2.authorize(config);
};

const onSmartAuthenticatedSessionReady = FHIR.oauth2.ready;

// arrow functions with no parameters
const endSmartAuthenticatedSession = () => {
  console.log("Ending SmartAuthenticatedSession");
  sessionStorage.clear();
};

export default {
  startSmartAuthenticatedSession,
  onSmartAuthenticatedSessionReady,
  endSmartAuthenticatedSession
};
