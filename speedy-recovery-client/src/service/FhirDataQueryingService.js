/*global FHIR */
import "fhirclient/fhir-client";

const getUserAppointment = userID => {
  return new Promise((resolve, reject) => {
    FHIR.oauth2.ready(
      smart => {
        smart.api.search({type: "Appointment", query: { 'actor': userID }}).done(
          appointment =>{
            console.log("User appointment response: ", appointment);
            return resolve(appointment);
          });
      },
      error => {
        console.error("Appointment fetching error: ", error);
        return reject(error);
      });
  });
};

export default {
  getUserAppointment
};
