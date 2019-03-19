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

/* This file cotnains functions used to map STU3 resources into our internal format.
 */

import {
  getbodySite,
  getFirstName,
  getForm,
  getLocation,
  getMedName,
  getName,
  getPatient,
  getPatientId,
  getPhone,
  getPractitioner,
  getPractitionerId,
  getPractName,
  getSeverity,
  getSummary,
  getOnSetAge
} from "./FhirDataMappingExtractionUtils";

const missingField = "Unknown";
const mapPersonToUserSTU3 = fhirPersonResource => ({
  id: fhirPersonResource.id ? fhirPersonResource.id : missingField,
  // This is a temporary hard-code fix as the SMART sandbox does not support logging in as a patients' parent
  role:
    fhirPersonResource.id === "b1f0365d-f405-45c0-8cbd-da56518e7504"
      ? "Parent"
      : fhirPersonResource.resourceType,

  name: getName(fhirPersonResource.name),
  firstName: getFirstName(fhirPersonResource.name),
  birthDate: fhirPersonResource.birthDate
    ? formatBirthDate(fhirPersonResource.birthDate)
    : missingField,
  gender: fhirPersonResource.gender ? fhirPersonResource.gender : missingField,
  careProvider: getGP(fhirPersonResource.generalPractitioner),
  address: getAddress(fhirPersonResource.address),
  phone: getPhone(fhirPersonResource.telecom),
  email: getEmail(fhirPersonResource.telecom)
});

const mapAppointmentSTU3 = fhirAppointmentResource => ({
  id: fhirAppointmentResource.id ? fhirAppointmentResource.id : missingField,
  title: getTitle(fhirAppointmentResource.text),
  status: fhirAppointmentResource.status
    ? fhirAppointmentResource.status
    : missingField,
  appType: getAppType(fhirAppointmentResource.appointmentType),
  indication: getIndication(fhirAppointmentResource.indication),
  priority: fhirAppointmentResource.priority
    ? fhirAppointmentResource.priority
    : missingField,
  description: fhirAppointmentResource.description
    ? fhirAppointmentResource.description
    : missingField,
  supportingInfo: getSupportingInfo(
    fhirAppointmentResource.supportingInformation
  ),
  start: fhirAppointmentResource.start
    ? new Date(fhirAppointmentResource.start)
    : missingField,
  end: fhirAppointmentResource.end
    ? new Date(fhirAppointmentResource.end)
    : missingField,
  created: fhirAppointmentResource.created
    ? new Date(fhirAppointmentResource.created)
    : missingField,
  comment: fhirAppointmentResource.comment
    ? fhirAppointmentResource.comment
    : missingField,
  patient: getPatient(fhirAppointmentResource.participant),
  patientId: getPatientId(fhirAppointmentResource.participant),
  practitioner: getPractitioner(fhirAppointmentResource.participant),
  practitionerId: getPractitionerId(fhirAppointmentResource.participant),
  location: getLocation(fhirAppointmentResource.participant)
});

const mapConditionSTU3 = fhirCondResource => ({
  clinicalStatus: fhirCondResource.clinicalStatus
    ? fhirCondResource.clinicalStatus
    : missingField,
  verificationStatus: fhirCondResource.verificationStatus
    ? fhirCondResource.verificationStatus
    : missingField,
  severity: getSeverity(fhirCondResource.severity),
  summary: getSummary(fhirCondResource.code),
  bodySite: getbodySite(fhirCondResource.bodySite),
  onsetDateTime: fhirCondResource.onsetDateTime
    ? new Date(fhirCondResource.onsetDateTime)
    : missingField
});

const mapMedicationSTU3 = fhirMedResource => ({
  id: fhirMedResource.id ? fhirMedResource.id : missingField,
  producer: getProducer(fhirMedResource.contained),
  name: getMedName(fhirMedResource.code),
  isBrand:
    fhirMedResource.isBrand !== undefined
      ? fhirMedResource.isBrand
      : missingField,
  isOverTheCounter:
    fhirMedResource.isOverTheCounter !== undefined
      ? fhirMedResource.isOverTheCounter
      : missingField,
  form: getForm(fhirMedResource.form),
  content: getContent(fhirMedResource.package),
  imageURL: getImageURL(fhirMedResource.image)
});

const mapFamilyHistorySTU3 = fhirFamilyResource => ({
  name: fhirFamilyResource.name ? fhirFamilyResource.name : missingField,
  relationship: fhirFamilyResource.relationship.coding[0].display
    ? fhirFamilyResource.relationship.coding[0].display
    : missingField,
  condition: fhirFamilyResource.condition[0].code.text
    ? fhirFamilyResource.condition[0].code.text
    : missingField,
  onsetAge: getOnSetAge(fhirFamilyResource),
  date: fhirFamilyResource.date ? fhirFamilyResource.date : missingField
});

const mapGoalSTU3 = fhirGoalResource => ({
  goal: fhirGoalResource.category[0].coding[0].code
    ? fhirGoalResource.category[0].coding[0].code
    : missingField,
  priority: fhirGoalResource.priority.text
    ? fhirGoalResource.priority.text
    : missingField,
  description: fhirGoalResource.description.text
    ? fhirGoalResource.description.text
    : missingField,
  startDate: fhirGoalResource.startDate
    ? fhirGoalResource.startDate
    : missingField,
  dueDate: fhirGoalResource.target.dueDate
    ? fhirGoalResource.target.dueDate
    : missingField
});

const mapMedicationDispenseSTU3 = fhirMedResource => ({
  id: fhirMedResource.id ? fhirMedResource.id : missingField,
  status:
    fhirMedResource.status !== undefined
      ? fhirMedResource.status
      : missingField,
  name: getMedDispenseName(fhirMedResource.medicationCodeableConcept),
  quantity: fhirMedResource.quantity.value
    ? fhirMedResource.quantity.value
    : missingField,
  daysSupply: fhirMedResource.daysSupply.value
    ? fhirMedResource.daysSupply.value
    : missingField,
  intakeMethod: getIntakeMethod(fhirMedResource.dosageInstruction),
  dosageFrequency: getDosageFrequency(fhirMedResource.dosageInstruction),
  dosagePeriod: getDosagePeriod(fhirMedResource.dosageInstruction),
  whenHandedOver:
    fhirMedResource.whenHandedOver !== undefined
      ? fhirMedResource.whenHandedOver
      : missingField
});

const mapCarePlanSTU3 = fhirCareResource => ({
  id: fhirCareResource.id ? fhirCareResource.id : missingField,
  status:
    fhirCareResource.status !== undefined
      ? fhirCareResource.status
      : missingField,
  activities: getCarePlanActivities(fhirCareResource.activity),
  category: getCarePlanCategory(fhirCareResource.category),
  period: getCarePlanPeriod(fhirCareResource.period)
});

const mapPractitionerSTU3 = fhirPractResource => ({
  name: getPractName(fhirPractResource.name),
  id: fhirPractResource.id ? fhirPractResource.id : missingField,
  gender: fhirPractResource.gender ? fhirPractResource.gender : missingField,
  birthDate: fhirPractResource.birthDate
    ? fhirPractResource.birthDate
    : missingField,
  phone: getPhone(fhirPractResource.telecom),
  email: getEmail(fhirPractResource.telecom),
  photo: getPhoto(fhirPractResource.photo)
});

const getCarePlanCategory = category => {
  if (
    category &&
    category[0] &&
    category[0].coding &&
    category[0].coding[0] &&
    category[0].coding[0].display
  ) {
    return category[0].coding[0].display;
  }
  return missingField;
};

const getCarePlanActivities = activity => {
  if (activity) {
    let actStr = "";
    let actNum = activity.length;
    for (let i = 0; i < actNum; i++) {
      if (
        activity[i] &&
        activity[i].detail &&
        activity[i].detail.code &&
        activity[i].detail.code.coding &&
        activity[i].detail.code.coding[0] &&
        activity[i].detail.code.coding[0].display
      ) {
        actStr =
          actStr +
          (i + 1).toString() +
          ". " +
          activity[i].detail.code.coding[0].display +
          ";";
      }
    }
    return actStr;
  }

  return missingField;
};

const getCarePlanPeriod = period => {
  if (period) {
    return "from " + getCarePlanStart(period) + " to " + getCarePlanEnd(period);
  }
  return missingField;
};

const getCarePlanStart = period => {
  if (period && period.start) {
    return period.start;
  }
  return missingField;
};

const getCarePlanEnd = period => {
  if (period && period.end) {
    return period.end;
  }
  return missingField;
};

const getIntakeMethod = dosageInstruction => {
  if (
    dosageInstruction &&
    dosageInstruction[0] &&
    dosageInstruction[0].route &&
    dosageInstruction[0].route.coding &&
    dosageInstruction[0].route.coding[0] &&
    dosageInstruction[0].route.coding[0].display
  ) {
    return dosageInstruction[0].route.coding[0].display;
  }
};

const getDosageFrequency = dosageInstruction => {
  if (
    dosageInstruction &&
    dosageInstruction[0] &&
    dosageInstruction[0].timing &&
    dosageInstruction[0].timing.repeat &&
    dosageInstruction[0].timing.repeat.frequency
  ) {
    return dosageInstruction[0].timing.repeat.frequency;
  }
};
const getDosagePeriod = dosageInstruction => {
  if (
    dosageInstruction &&
    dosageInstruction[0] &&
    dosageInstruction[0].timing &&
    dosageInstruction[0].timing.repeat &&
    dosageInstruction[0].timing.repeat.period
  ) {
    return dosageInstruction[0].timing.repeat.period;
  }
};

const getPhoto = photo => {
  if (photo && photo[0] && photo[0].data) {
    return photo[0].data;
  }
  return missingField;
};

const getGP = generalPractitioner => {
  if (
    generalPractitioner &&
    generalPractitioner[0] &&
    generalPractitioner[0].reference
  ) {
    return generalPractitioner[0].reference;
  }
  return missingField;
};

const getAddress = address => {
  if (
    address &&
    address[0] &&
    address[0].line + address[0].line[0] &&
    address[0].city &&
    address[0].state &&
    address[0].postalCode &&
    address[0].country
  ) {
    return (
      address[0].line[0] +
      ", " +
      address[0].city +
      ", " +
      address[0].state +
      ", " +
      address[0].postalCode +
      ", " +
      address[0].country
    );
  }
  return missingField;
};

const getEmail = telecom => {
  if (telecom) {
    const result = telecom.filter(element => element.system === "email");
    if (result.length !== 0) {
      return result[0].value;
    }
  }
  return missingField;
};

const getTitle = text => {
  if (text && text.div) {
    return text.div.substring(42, text.div.length - 6);
  }
  return missingField;
};

const getAppType = appointmentType => {
  if (
    appointmentType &&
    appointmentType.coding &&
    appointmentType.coding[0] &&
    appointmentType.coding[0].display
  ) {
    return appointmentType.coding[0].display;
  }
  return missingField;
};
const getIndication = indication => {
  if (indication && indication[0] && indication[0].display) {
    return indication[0].display;
  }
  return missingField;
};

const getSupportingInfo = supportingInformation => {
  if (
    supportingInformation &&
    supportingInformation[0] &&
    supportingInformation[0].reference
  ) {
    return supportingInformation[0].reference;
  }
  return missingField;
};

const getProducer = contained => {
  if (contained && contained[0] && contained[0].name) {
    return contained[0].name;
  }
  return missingField;
};

const getMedDispenseName = medicationCodeableConcept => {
  if (medicationCodeableConcept && medicationCodeableConcept.text) {
    return medicationCodeableConcept.text;
  }
  return missingField;
};

const getContent = packageC => {
  if (
    packageC &&
    packageC.content &&
    packageC.content[0] &&
    packageC.content[0].itemCodeableConcept &&
    packageC.content[0].itemCodeableConcept.coding &&
    packageC.content[0].itemCodeableConcept.coding[0] &&
    packageC.content[0].itemCodeableConcept.coding[0].display
  ) {
    return packageC.content[0].itemCodeableConcept.coding[0].display;
  }
  return missingField;
};

const getImageURL = image => {
  if (image && image[0] && image[0].title) {
    return image[0].title;
  }
  return missingField;
};

const formatBirthDate = birthDate => {
  if (birthDate) {
    return new Date(birthDate).toLocaleDateString("en-uk");
  }
  return missingField;
};

const getChildIDSTU3 = currentUserResource => {
  if (
    currentUserResource &&
    currentUserResource.link &&
    currentUserResource.link[0].other &&
    currentUserResource.link[0].other.reference
  ) {
    const patient = currentUserResource.link[0].other.reference;
    const childID = patient.split("/")[1];
    return childID;
  }
  return null;
};

export {
  mapPersonToUserSTU3,
  mapAppointmentSTU3,
  mapConditionSTU3,
  mapMedicationSTU3,
  mapMedicationDispenseSTU3,
  mapCarePlanSTU3,
  mapPractitionerSTU3,
  mapFamilyHistorySTU3,
  mapGoalSTU3,
  getChildIDSTU3
};
