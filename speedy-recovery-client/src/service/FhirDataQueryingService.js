/*global FHIR */
import "fhirclient/fhir-client";

// Note: Currently, this service can be used for FHIR DSTU2 as well as STU3, as they are equal in terms of
// the relevant fields for given queries. This might change if there are breaking changes in the standard
// or more specific queries will be added.

// TODO: Also add error handling and return [] if (!appointments.data || !appointments.data.total)
const extractResourcesFromBundle = appointments =>
  appointments.data.total !== 0
    ? appointments.data.entry.map(app => app.resource)
    : [];

const extractSpecificPractitionerFromBundle = (practitioner, practId) =>
  practitioner.data.entry.filter(pract => pract.resource.id === practId);

const getUserAppointments = userID => {
  return new Promise((resolve, reject) => {
    FHIR.oauth2.ready(
      smart => {
        smart.api
          .search({ type: "Appointment", query: { actor: userID } })
          .done(appointmentsBundle => {
            console.log("User appointment response: ", appointmentsBundle);
            const appointments = extractResourcesFromBundle(appointmentsBundle);
            console.log("Appointments Resource after mapping: ", appointments);
            return resolve(appointments);
          });
      },
      error => {
        console.error("Appointment fetching error: ", error);
        return reject(error);
      }
    );
  });
};

const getPractitioner = (practId, familyName) => {
  return new Promise((resolve, reject) => {
    FHIR.oauth2.ready(
      smart => {
        smart.api
          .search({ type: "Practitioner", query: { family: familyName } })
          .done(practitionerBundle => {
            console.log("Practitioner response: ", practitionerBundle);
            console.log(familyName);
            if (practitionerBundle.data.total === 0) {
              console.log("No practitioner found with name " + familyName);
              return;
            }
            const practitioner = extractSpecificPractitionerFromBundle(
              practitionerBundle,
              practId
            );
            console.log(
              "Practitioner response Resource after mapping: ",
              practitioner
            );
            return resolve(practitioner[0]);
          });
      },
      error => {
        console.error("Practitioner fetching error: ", error);
        return reject(error);
      }
    );
  });
};

export default {
  getPractitioner,
  getUserAppointments,
  extractResourcesFromBundle
};
