/*global FHIR */
import "fhirclient/fhir-client";
import smartConfig from "../config/smartConfig";

function startSmartAuthenticatedSession() {
  FHIR.oauth2.authorize(smartConfig);
}

function endSmartAuthenticatedSession() {
  sessionStorage.clear();
}

export default { startSmartAuthenticatedSession, endSmartAuthenticatedSession };