/*global FHIR */
import "fhirclient/fhir-client";
import smartProviderConfig from "../config/smartProviderConfig";
import smartPatientConfig from "../config/smartPatientConfig";
import smartParentConfig from "../config/smartParentConfig";

const startSmartAuthenticatedSession = user => {
  console.log("Starting SmartAuthenticatedSession");

  if (user === "Practitioner") {
    FHIR.oauth2.authorize(smartProviderConfig);
  } else if (user === "Patient") {
    FHIR.oauth2.authorize(smartPatientConfig);
  } else if (user === "Parent") {
    FHIR.oauth2.authorize(smartParentConfig);
  } else {
    console.log("Authentication Error");
  }
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
