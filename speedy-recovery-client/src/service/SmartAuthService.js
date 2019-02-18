/*global FHIR */
import "fhirclient/fhir-client";
import smartProviderConfig from "../config/smartProviderConfig";
import smartPatientConfig from "../config/smartPatientConfig";
import smartParentConfig from "../config/smartParentConfig";

const startSmartAuthenticatedSession = user => {
  console.log("Starting SmartAuthenticatedSession");

  var config = undefined;
  const errorCallback = error => console.error(error);

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
