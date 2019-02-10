/*global FHIR */
import "fhirclient/fhir-client";
import smartConfig from "../config/smartConfig";

const startSmartAuthenticatedSession = () => {
  FHIR.oauth2.authorize(smartConfig);
};

const onSmartAuthenticatedSessionReady = FHIR.oauth2.ready;

const endSmartAuthenticatedSession = () => {
  sessionStorage.clear();
};

export default {
  startSmartAuthenticatedSession,
  onSmartAuthenticatedSessionReady,
  endSmartAuthenticatedSession
};