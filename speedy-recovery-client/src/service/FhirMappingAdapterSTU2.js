import {
  getbodySite,
  getForm,
  getLocation,
  getMedName,
  getName,
  getPatient,
  getPhone,
  getPractitioner,
  getSeverity,
  getSummary
} from "./FhirDataMappingExtractionUtils";

const missingField = "Unknown";
const mapPatientToUserSTU2 = fhirPatientResource => ({
  //This is a temporary hard-code fix as we have not implemented the searching for a patients' parent
  role:
    fhirPatientResource.id === "f0462936-eb4b-4da1-b45a-fbd96ebf8ccb"
      ? "Parent"
      : fhirPatientResource.resourceType,

  name: getName(fhirPatientResource.name),
  birthDate: fhirPatientResource.birthDate
    ? fhirPatientResource.birthDate
    : missingField,
  gender: fhirPatientResource.gender
    ? fhirPatientResource.gender
    : missingField,
  careProvider: "Undefined in STU2",
  address: getAddress(fhirPatientResource.address),
  phone: getPhone(fhirPatientResource.telecom),
  email: "Undefined in STU2"
});

const mapAppointmentSTU2 = fhirAppResource => ({
  id: fhirAppResource.id ? fhirAppResource.id : missingField,
  title: getTitle(fhirAppResource.text),
  status: fhirAppResource.status ? fhirAppResource.status : missingField,
  appType: "Undefined in STU2",
  indication: "Undefined in STU2",
  priority: fhirAppResource.priority ? fhirAppResource.priority : missingField,
  description: fhirAppResource.description
    ? fhirAppResource.description
    : missingField,
  supportingInfo: "Undefined in STU2",
  start: fhirAppResource.start ? new Date(fhirAppResource.start) : missingField,
  end: fhirAppResource.end ? new Date(fhirAppResource.end) : missingField,
  created: "Undefined in STU2",
  comment: fhirAppResource.comment ? fhirAppResource.comment : missingField,
  patient: getPatient(fhirAppResource.participant),
  practitioner: getPractitioner(fhirAppResource.participant),
  location: getLocation(fhirAppResource.participant)
});

const mapConditionSTU2 = fhirCondResource => ({
  clinicalStatus: "Undefined in STU2",
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

const mapMedicationSTU2 = fhirMedResource => ({
  id: fhirMedResource.id ? fhirMedResource.id : missingField,
  producer: "Undefined in STU2",
  name: getMedName(fhirMedResource.code),
  isBrand:
    fhirMedResource.isBrand !== "undefined"
      ? fhirMedResource.isBrand
      : missingField,
  isOverTheCounter: "Undefined in STU2",
  form: getForm(fhirMedResource.product.form),
  content: "Undefined in STU2",
  imageURL: "Undefined in STU2"
});

const getAddress = address => {
  if (
    address &&
    address[0] &&
    address[0].line + address[0].line[0] &&
    address[0].city &&
    address[0].district &&
    address[0].state &&
    address[0].postalCode
  ) {
    return (
      address[0].line[0] +
      ", " +
      address[0].city +
      ", " +
      address[0].district +
      ", " +
      address[0].state +
      ", " +
      address[0].postalCode
    );
  }
  return missingField;
};

const getTitle = text => {
  if (text && text.div) {
    return text.div.substring(5, text.div.length - 6);
  }
  return missingField;
};

export {
  mapPatientToUserSTU2,
  mapAppointmentSTU2,
  mapConditionSTU2,
  mapMedicationSTU2
};
