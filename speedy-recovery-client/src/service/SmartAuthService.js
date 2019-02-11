/*global FHIR */
import "fhirclient/fhir-client";
import smartConfig from "../config/smartConfig";

const startSmartAuthenticatedSession = () => {
  console.log("Starting SmartAuthenticatedSession");
  FHIR.oauth2.authorize(smartConfig);
};

const onSmartAuthenticatedSessionReady = FHIR.oauth2.ready;

const endSmartAuthenticatedSession = () => {
  console.log("Ending SmartAuthenticatedSession");
  sessionStorage.clear();
};

export default {
  startSmartAuthenticatedSession,
  onSmartAuthenticatedSessionReady,
  endSmartAuthenticatedSession
};
