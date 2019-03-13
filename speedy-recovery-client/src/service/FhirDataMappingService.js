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

/* This file controls the mapping of fhir resources to our internal format and differs depending on the version of FHIR
being used.
 */

import {
  mapAppointmentSTU2,
  mapConditionSTU2,
  mapMedicationSTU2,
  mapMedicationDispenseSTU2,
  mapCarePlanSTU2,
  mapPatientToUserSTU2,
  mapPractitionerSTU2,
  getChildIDSTU2
} from "./FhirMappingAdapterDSTU2";
import {
  mapAppointmentSTU3,
  mapConditionSTU3,
  mapMedicationSTU3,
  mapMedicationDispenseSTU3,
  mapCarePlanSTU3,
  mapPatientToUserSTU3,
  mapPractitionerSTU3,
  getChildIDSTU3
} from "./FhirMappingAdapterSTU3";

const fhirMapPatient = (resource, version) => {
  if (version) {
    switch (version[0]) {
      case "1":
      case "2":
        return mapPatientToUserSTU2(resource);
      case "3":
        return mapPatientToUserSTU3(resource);
      default:
        console.log("Invalid version of FHIR resource provided: ", version);
    }
  }
  console.log("No FHIR version has been supplied");
  return null;
};

const fhirMapAppointment = (resource, version) => {
  if (version) {
    switch (version[0]) {
      case "1":
      case "2":
        return mapAppointmentSTU2(resource);
      case "3":
        return mapAppointmentSTU3(resource);
      default:
        console.log("App Invalid version of FHIR resource provided: ", version);
    }
  }
  console.log("No FHIR version has been supplied");
  return null;
};

const fhirMapCondition = (resource, version) => {
  if (version) {
    switch (version[0]) {
      case "1":
      case "2":
        return mapConditionSTU2(resource);
      case "3":
        return mapConditionSTU3(resource);
      default:
        console.log("Invalid version of FHIR resource provided: ", version);
    }
  }
  console.log("No FHIR version has been supplied");
  return null;
};

const fhirMapMedication = (resource, version) => {
  if (version) {
    switch (version[0]) {
      case "1":
      case "2":
        return mapMedicationSTU2(resource);
      case "3":
        return mapMedicationSTU3(resource);
      default:
        console.log("Invalid version of FHIR resource provided: ", version);
    }
  }
  console.log("No FHIR version has been supplied");
  return null;
};

const fhirMapMedicationDispense = (resource, version) => {
  if (version) {
    switch (version[0]) {
      case "1":
      case "2":
        return mapMedicationDispenseSTU2(resource);
      case "3":
        return mapMedicationDispenseSTU3(resource);
      default:
        console.log("Invalid version of FHIR resource provided: ", version);
    }
  }
  console.log("No FHIR version has been supplied");
  return null;
};

const fhirMapPractitioner = (resource, version) => {
  if (version) {
    switch (version[0]) {
      case "1":
      case "2":
        return mapPractitionerSTU2(resource);
      case "3":
        return mapPractitionerSTU3(resource);
      default:
        console.log("Invalid version of FHIR resource provided: ", version);
    }
  }
  console.log("No FHIR version has been supplied");
  return null;
};

const fhirMapCarePlan = (resource, version) => {
  if (version) {
    switch (version[0]) {
      case "1":
      case "2":
        return mapCarePlanSTU2(resource);
      case "3":
        return mapCarePlanSTU3(resource);
      default:
        console.log("Invalid version of FHIR resource provided: ", version);
    }
  }
  console.log("No FHIR version has been supplied");
  return null;
};

const getChildID = (resource, version) => {
  if (version) {
    switch (version[0]) {
      case "1":
      case "2":
        return getChildIDSTU2(resource);
      case "3":
        return getChildIDSTU3(resource);
      default:
        console.log("Invalid version of FHIR resource provided: ", version);
    }
  }
  console.log("No FHIR version has been supplied");
};

export {
  fhirMapPatient,
  fhirMapAppointment,
  fhirMapCondition,
  fhirMapMedication,
  fhirMapMedicationDispense,
  fhirMapCarePlan,
  fhirMapPractitioner,
  getChildID
};
