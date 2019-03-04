import {
  getbodySite,
  getForm,
  getLocation,
  getMedName,
  getName,
  getPatient,
  getPhone,
  getPractitioner,
  getPatientId,
  getPractitionerId,
  getSeverity,
  getSummary
} from "./FhirDataMappingExtractionUtils";

const missingField = "Unknown";
const mapPatientToUserSTU3 = fhirPatientResource => ({
  id: fhirPatientResource.id ? fhirPatientResource.id : missingField,
  //This is a temporary hard-code fix as we have not implemented the searching for a patients' parent
  role:
    fhirPatientResource.id === "219959"
      ? "Parent"
      : fhirPatientResource.resourceType,

  name: getName(fhirPatientResource.name),
  birthDate: fhirPatientResource.birthDate
    ? formatBirthDate(fhirPatientResource.birthDate)
    : missingField,
  gender: fhirPatientResource.gender
    ? fhirPatientResource.gender
    : missingField,
  careProvider: getGP(fhirPatientResource.generalPractitioner),
  address: getAddress(fhirPatientResource.address),
  phone: getPhone(fhirPatientResource.telecom),
  email: getEmail(fhirPatientResource.telecom)
});

const mapAppointmentSTU3 = fhirAppResource => ({
  id: fhirAppResource.id ? fhirAppResource.id : missingField,
  title: getTitle(fhirAppResource.text),
  status: fhirAppResource.status ? fhirAppResource.status : missingField,
  appType: getAppType(fhirAppResource.appointmentType),
  indication: getIndication(fhirAppResource.indication),
  priority: fhirAppResource.priority ? fhirAppResource.priority : missingField,
  description: fhirAppResource.description
    ? fhirAppResource.description
    : missingField,
  supportingInfo: getSupportingInfo(fhirAppResource.supportingInformation),
  start: fhirAppResource.start ? new Date(fhirAppResource.start) : missingField,
  end: fhirAppResource.end ? new Date(fhirAppResource.end) : missingField,
  created: fhirAppResource.created
    ? new Date(fhirAppResource.created)
    : missingField,
  comment: fhirAppResource.comment ? fhirAppResource.comment : missingField,
  patient: getPatient(fhirAppResource.participant),
  patientId: getPatientId(fhirAppResource.participant),
  practitioner: getPractitioner(fhirAppResource.participant),
  practitionerId: getPractitionerId(fhirAppResource.participant),
  location: getLocation(fhirAppResource.participant)
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

export {
  mapPatientToUserSTU3,
  mapAppointmentSTU3,
  mapConditionSTU3,
  mapMedicationSTU3
};
