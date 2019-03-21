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

/* This file contains functions to help map various fields from fhir resources into our internal format.
 */

const missingField = "Unknown";

const getName = name => {
  if (name && name[0] && name[0].family && name[0].given) {
    let firstName = name[0].given;
    if (firstName.length > 1) {
      firstName = firstName.join(" ");
    }
    return firstName + " " + name[0].family;
  }
  return missingField;
};

const getFirstName = name => {
  if (name && name[0] && name[0].given) {
    let firstName = name[0].given;
    if (firstName.length > 1) {
      firstName = firstName[0];
    }
    return firstName.toString();
  }
};

const getPhone = telecom => {
  if (telecom) {
    const result = telecom.filter(element => element.system === "phone");
    if (result.length !== 0) {
      return result[0].value;
    }
  }
  return missingField;
};

const getPatient = participant => {
  if (
    participant &&
    participant[0] &&
    participant[0].actor &&
    participant[0].actor.display
  ) {
    return participant[0].actor.display;
  }
  return missingField;
};

const getPractitioner = participant => {
  if (
    participant &&
    participant[1] &&
    participant[1].actor &&
    participant[1].actor.display
  ) {
    return participant[1].actor.display;
  }
  return missingField;
};

const getPatientId = participant => {
  if (
    participant &&
    participant[0] &&
    participant[0].actor &&
    participant[0].actor.reference
  ) {
    const arr = participant[0].actor.reference.split("/");
    return arr[1];
  }
  return missingField;
};

const getPractitionerId = participant => {
  if (
    participant &&
    participant[1] &&
    participant[1].actor &&
    participant[1].actor.reference
  ) {
    const arr = participant[1].actor.reference.split("/");
    return arr[1];
  }
  return missingField;
};

const getLocation = participant => {
  if (
    participant &&
    participant[2] &&
    participant[2].actor &&
    participant[2].actor.display
  ) {
    return participant[2].actor.display;
  }
  return missingField;
};

const getSeverity = severity => {
  if (
    severity &&
    severity.coding &&
    severity.coding[0] &&
    severity.coding[0].display
  ) {
    return severity.coding[0].display;
  }
  return missingField;
};

const getSummary = summary => {
  if (summary && summary.text) {
    return summary.text;
  }
  return missingField;
};

const getbodySite = bodySite => {
  if (bodySite && bodySite[0] && bodySite[0].text) {
    return bodySite[0].text;
  }
  return missingField;
};

const getMedName = code => {
  if (code && code.coding && code.coding[0] && code.coding[0].display) {
    return code.coding[0].display;
  }
  return missingField;
};

const getForm = form => {
  if (form && form.coding && form.coding[0] && form.coding[0].display) {
    return form.coding[0].display;
  }
  return missingField;
};

const getPractName = name => {
  if (name && name[0] && name[0].given && name[0].given[0] && name[0].family) {
    return name[0].given[0] + " " + name[0].family;
  }
  return missingField;
};

const getOnSetAge = resource => {
  if (
    resource &&
    resource.condition &&
    resource.condition[0] &&
    resource.condition[0].onsetAge.value &&
    resource.condition[0].onsetAge.unit
  ) {
    return (
      resource.condition[0].onsetAge.value +
      " " +
      resource.condition[0].onsetAge.unit
    );
  }
};

const getCauseOfDeath = fhirFamilyResource => {
  if (
    fhirFamilyResource.condition &&
    fhirFamilyResource.condition[0] &&
    fhirFamilyResource.condition[0].code &&
    fhirFamilyResource.condition[0].code.text
  ) {
    return fhirFamilyResource.condition[0].code.text;
  }
  return missingField;
};

export {
  getName,
  getFirstName,
  getPhone,
  getPatient,
  getPractitioner,
  getPatientId,
  getPractitionerId,
  getLocation,
  getSeverity,
  getSummary,
  getbodySite,
  getMedName,
  getForm,
  getPractName,
  getOnSetAge,
  getCauseOfDeath
};
