/*global FHIR */
import "fhirclient/fhir-client";
import smartConfig from "../config/smartConfig";

const startSmartAuthenticatedSession = () => {
  console.log("Starting SmartAuthenticatedSession");
  const errorCallback = error => console.error(error);
  FHIR.oauth2.authorize(smartConfig, errorCallback);
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