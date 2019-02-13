/*global FHIR */
import "fhirclient/fhir-client";
import smartConfig from "../config/smartConfig";
// arrow functions with no parameters
const startSmartAuthenticatedSession = () => {
  console.log("Starting SmartAuthenticatedSession");
  FHIR.oauth2.authorize(smartConfig);
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