/*global FHIR */
import "fhirclient/fhir-client";
import smartProviderConfig from "../config/smartProviderConfig";
import smartPatientConfig from "../config/smartPatientConfig";

const startSmartAuthenticatedSession = user => {
  console.log("Starting SmartAuthenticatedSession");

  if (user === "Practitioner") {
    FHIR.oauth2.authorize(smartProviderConfig);
  } else if (user === "Patient") {
    FHIR.oauth2.authorize(smartPatientConfig);
  } else if (user === "Parent") {
    console.log("Parent");
  } else {
    console.log("Authentication Error");
  }
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
