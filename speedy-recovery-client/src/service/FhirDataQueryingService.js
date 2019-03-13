/*
 * Speedy Recovery -- A patient-centred app based on the FHIR standard facilitating communication between paediatric
 * patients, parents and hospital staff
 *
 * Copyright (C) 2019 University College London
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not,
 * see http://www.gnu.org/license/.
 * */

/* This file carries out queries to the FHIR server in order to retrieve the relevant resources to be used in the
application.
 */

/*global FHIR */
import "fhirclient/fhir-client";

// Note: Currently, this service can be used for FHIR DSTU2 as well as STU3, as they are equal in terms of
// the relevant fields for given queries. This might change if there are breaking changes in the standard
// or more specific queries will be added.

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

const getUserConditions = userID => {
  return new Promise((resolve, reject) => {
    FHIR.oauth2.ready(
      smart => {
        smart.api
          .search({ type: "Condition", query: { subject: userID } })
          .done(conditionBundle => {
            console.log("User condition response: ", conditionBundle);
            const conditions = extractResourcesFromBundle(conditionBundle);
            console.log("Conditions Resource after mapping: ", conditions);
            return resolve(conditions);
          });
      },
      error => {
        console.error("Condition fetching error: ", error);
        return reject(error);
      }
    );
  });
};

const getUserMedicationDispense = userID => {
  return new Promise((resolve, reject) => {
    FHIR.oauth2.ready(
      smart => {
        smart.api
          .search({ type: "MedicationDispense", query: { subject: userID } })
          .done(medicationBundle => {
            console.log(
              "User medication dispense response: ",
              medicationBundle
            );
            const medications = extractResourcesFromBundle(medicationBundle);
            console.log(
              "MedicationDispenses Resource after mapping: ",
              medications
            );
            return resolve(medications);
          });
      },
      error => {
        console.error("MedicationDispense fetching error: ", error);
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

const getUserCarePlan = userID => {
  return new Promise((resolve, reject) => {
    FHIR.oauth2.ready(
      smart => {
        smart.api
          .search({ type: "CarePlan", query: { subject: userID } })
          .done(carePlanBundle => {
            console.log("User care plan response: ", carePlanBundle);
            const carePlans = extractResourcesFromBundle(carePlanBundle);
            console.log("CarePlans Resource after mapping: ", carePlans);
            return resolve(carePlans);
          });
      },
      error => {
        console.error("CarePlan fetching error: ", error);
        return reject(error);
      }
    );
  });
};

export default {
  getPractitioner,
  getUserAppointments,
  getUserConditions,
  getUserMedicationDispense,
  getUserCarePlan,
  extractResourcesFromBundle
};
