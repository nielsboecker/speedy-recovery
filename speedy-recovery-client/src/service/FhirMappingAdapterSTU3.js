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

const mapPatientToUserSTU3 = fhirPatientResource => ({
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
  careProvider: getGP(fhirPatientResource.generalPractitioner),
  address: getAddress(fhirPatientResource.address),
  phone: getPhone(fhirPatientResource.telecom),
  email: getEmail(fhirPatientResource.telecom)
});

const mapAppointmentSTU3 = fhirAppResource => ({
  id: fhirAppResource.id ? fhirAppResource.id : "Unknown",
  title: getTitle(fhirAppResource.text),
  status: fhirAppResource.status ? fhirAppResource.status : "Unknown",
  appType: getAppType(fhirAppResource.appointmentType),
  indication: getIndication(fhirAppResource.indication),
  priority: fhirAppResource.priority ? fhirAppResource.priority : "Unknown",
  description: fhirAppResource.description
    ? fhirAppResource.description
    : "Unknown",
  supportingInfo: getSupportingInfo(fhirAppResource.supportingInformation),
  start: fhirAppResource.start ? new Date(fhirAppResource.start) : "Unknown",
  end: fhirAppResource.end ? new Date(fhirAppResource.end) : "Unknown",
  created: fhirAppResource.created
    ? new Date(fhirAppResource.created)
    : "Unknown",
  comment: fhirAppResource.comment ? fhirAppResource.comment : "Unknown",
  patient: getPatient(fhirAppResource.participant),
  practitioner: getPractitioner(fhirAppResource.participant),
  location: getLocation(fhirAppResource.participant)
});

const mapConditionSTU3 = fhirCondResource => ({
  clinicalStatus: fhirCondResource.clinicalStatus
    ? fhirCondResource.clinicalStatus
    : "Unknown",
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

const mapMedicationSTU3 = fhirMedResource => ({
  id: fhirMedResource.id ? fhirMedResource.id : "Unknown",
  producer: getProducer(fhirMedResource.contained),
  name: getMedName(fhirMedResource.code),
  isBrand:
    typeof fhirMedResource.isBrand !== "undefined"
      ? fhirMedResource.isBrand
      : "Unknown",
  isOverTheCounter:
    typeof fhirMedResource.isOverTheCounter !== "undefined"
      ? fhirMedResource.isOverTheCounter
      : "Unknown",
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
  return "Unknown";
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
  return "Unknown";
};

const getEmail = telecom => {
  if (telecom) {
    const result = telecom.filter(element => element.system === "email");
    if (result.length !== 0) {
      return result[0].value;
    }
  }
  return "Unknown";
};

const getTitle = text => {
  if (text && text.div) {
    return text.div.substring(42, text.div.length - 6);
  }
  return "Unknown";
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
  return "Unknown";
};
const getIndication = indication => {
  if (indication && indication[0] && indication[0].display) {
    return indication[0].display;
  }
  return "Unknown";
};

const getSupportingInfo = supportingInformation => {
  if (
    supportingInformation &&
    supportingInformation[0] &&
    supportingInformation[0].reference
  ) {
    return supportingInformation[0].reference;
  }
  return "Unknown";
};

const getProducer = contained => {
  if (contained && contained[0] && contained[0].name) {
    return contained[0].name;
  }
  return "Unknown";
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
  return "Unknown";
};

const getImageURL = image => {
  if (image && image[0] && image[0].title) {
    return image[0].title;
  }
  return "Unknown";
};

export {
  mapPatientToUserSTU3,
  mapAppointmentSTU3,
  mapConditionSTU3,
  mapMedicationSTU3
};
