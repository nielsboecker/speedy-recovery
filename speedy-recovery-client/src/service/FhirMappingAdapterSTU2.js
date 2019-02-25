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

const mapPatientToUserSTU2 = fhirPatientResource => ({
  //This is a temporary hard-code fix as we have not implemented the searching for a patients' parent
  role:
    fhirPatientResource.id === "f0462936-eb4b-4da1-b45a-fbd96ebf8ccb"
      ? "Parent"
      : fhirPatientResource.resourceType,

  name: getName(fhirPatientResource.name),
  birthDate: fhirPatientResource.birthDate
    ? new Date(fhirPatientResource.birthDate)
    : "Unknown",
  gender: fhirPatientResource.gender ? fhirPatientResource.gender : "Unknown",
  careProvider: "Undefined in STU2",
  address: getAddress(fhirPatientResource.address),
  phone: getPhone(fhirPatientResource.telecom),
  email: "Undefined in STU2"
});

const mapAppointmentSTU2 = fhirAppResource => ({
  id: fhirAppResource.id ? fhirAppResource.id : "Unknown",
  title: getTitle(fhirAppResource.text),
  status: fhirAppResource.status ? fhirAppResource.status : "Unknown",
  appType: "Undefined in STU2",
  indication: "Undefined in STU2",
  priority: fhirAppResource.priority ? fhirAppResource.priority : "Unknown",
  description: fhirAppResource.description
    ? fhirAppResource.description
    : "Unknown",
  supportingInfo: "Undefined in STU2",
  start: fhirAppResource.start ? new Date(fhirAppResource.start) : "Unknown",
  end: fhirAppResource.end ? new Date(fhirAppResource.end) : "Unknown",
  created: "Undefined in STU2",
  comment: fhirAppResource.comment ? fhirAppResource.comment : "Unknown",
  patient: getPatient(fhirAppResource.participant),
  practitioner: getPractitioner(fhirAppResource.participant),
  location: getLocation(fhirAppResource.participant)
});

const mapConditionSTU2 = fhirCondResource => ({
  clinicalStatus: "Undefined in STU2",
  verificationStatus: fhirCondResource.verificationStatus
    ? fhirCondResource.verificationStatus
    : "Unknown",
  severity: getSeverity(fhirCondResource.severity),
  summary: getSummary(fhirCondResource.code),
  bodySite: getbodySite(fhirCondResource.bodySite),
  onsetDateTime: fhirCondResource.onsetDateTime
    ? new Date(fhirCondResource.onsetDateTime)
    : "Unknown"
});

const mapMedicationSTU2 = fhirMedResource => ({
  id: fhirMedResource.id ? fhirMedResource.id : "Unknown",
  producer: "Undefined in STU2",
  name: getMedName(fhirMedResource.code),
  isBrand:
    typeof fhirMedResource.isBrand !== "undefined"
      ? fhirMedResource.isBrand
      : "Unknown",
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
  return "Unknown";
};

const getTitle = text => {
  if (text && text.div) {
    return text.div.substring(5, text.div.length - 6);
  }
  return "Unknown";
};

export {
  mapPatientToUserSTU2,
  mapAppointmentSTU2,
  mapConditionSTU2,
  mapMedicationSTU2
};
