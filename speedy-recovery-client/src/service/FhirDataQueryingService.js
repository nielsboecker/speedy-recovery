/*global FHIR */
import "fhirclient/fhir-client";

const getUserAppointments = userID => {
  return new Promise((resolve, reject) => {
    FHIR.oauth2.ready(
      smart => {
        smart.api
          .search({ type: "Appointment", query: { actor: userID } })
          .done(appointments => {
            console.log(
              "User appointment response: ",
              appointments.data.entry.map(app => app.resource)
            );
            return resolve(appointments.data.entry.map(app => app.resource));
          });
      },
      error => {
        console.error("Appointment fetching error: ", error);
        return reject(error);
      }
    );
  });
};

export default {
  getUserAppointments
};
