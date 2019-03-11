import {
  getbodySite,
  getForm,
  getLocation,
  getMedName,
  getName,
  getFirstName,
  getPatient,
  getPatientId,
  getPhone,
  getPractitioner,
  getSeverity,
  getSummary,
  getPractitionerId
} from "./FhirDataMappingExtractionUtils";

const missingField = "Unknown";
const mapPatientToUserSTU2 = fhirPatientResource => ({
  id: fhirPatientResource.id ? fhirPatientResource.id : missingField,
  // This is a temporary hard-code fix as the SMART sandbox does not support logging in as a patients' parent
  role:
    fhirPatientResource.id === "220041"
      ? "Parent"
      : fhirPatientResource.resourceType,

  name: getName(fhirPatientResource.name),
  firstName: getFirstName(fhirPatientResource.name),
  birthDate: fhirPatientResource.birthDate
    ? formatBirthDate(fhirPatientResource.birthDate)
    : missingField,
  gender: fhirPatientResource.gender
    ? fhirPatientResource.gender
    : missingField,
  careProvider: "Undefined in STU2",
  address: getAddress(fhirPatientResource.address),
  phone: getPhone(fhirPatientResource.telecom),
  email: "Undefined in STU2"
});

const mapAppointmentSTU2 = fhirAppointmentResource => ({
  id: fhirAppointmentResource.id ? fhirAppointmentResource.id : missingField,
  title: getTitle(fhirAppointmentResource.text),
  status: fhirAppointmentResource.status
    ? fhirAppointmentResource.status
    : missingField,
  appType: "Undefined in STU2",
  indication: "Undefined in STU2",
  priority: fhirAppointmentResource.priority
    ? fhirAppointmentResource.priority
    : missingField,
  description: fhirAppointmentResource.description
    ? fhirAppointmentResource.description
    : missingField,
  supportingInfo: "Undefined in STU2",
  start: fhirAppointmentResource.start
    ? new Date(fhirAppointmentResource.start)
    : missingField,
  end: fhirAppointmentResource.end
    ? new Date(fhirAppointmentResource.end)
    : missingField,
  created: "Undefined in STU2",
  comment: fhirAppointmentResource.comment
    ? fhirAppointmentResource.comment
    : missingField,
  patient: getPatient(fhirAppointmentResource.participant),
  patientId: getPatientId(fhirAppointmentResource.participant),
  practitioner: getPractitioner(fhirAppointmentResource.participant),
  practitionerId: getPractitionerId(fhirAppointmentResource.participant),
  location: getLocation(fhirAppointmentResource.participant)
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
    fhirMedResource.isBrand !== undefined
      ? fhirMedResource.isBrand
      : missingField,
  isOverTheCounter: "Undefined in STU2",
  form: getForm(fhirMedResource.product.form),
  content: "Undefined in STU2",
  imageURL: "Undefined in STU2"
});

const mapMedicationDispenseSTU2 = fhirMedResource => ({
  id: fhirMedResource.id ? fhirMedResource.id : missingField,
  status:
    fhirMedResource.status !== undefined
      ? fhirMedResource.status
      : missingField,
  name: getMedDispenseName(fhirMedResource.medicationCodeableConcept),
  quantity: getMedDispenseQuantity(fhirMedResource.quantity),
  daysSupply: getMedDispenseDaysSupply(fhirMedResource.daysSupply),
  whenHandedOver:
    fhirMedResource.whenHandedOver !== undefined
      ? fhirMedResource.whenHandedOver
      : missingField
});

const mapCarePlanSTU2 = fhirCareResource => ({
  id: fhirCareResource.id ? fhirCareResource.id : missingField,
  status:
    fhirCareResource.status !== undefined
      ? fhirCareResource.status
      : missingField,
  activities: getCarePlanActivities(fhirCareResource.activity),
  category: getCarePlanCategory(fhirCareResource.category),
  period: getCarePlanPeriod(fhirCareResource.period)
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
          "; ";
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

const getMedDispenseDaysSupply = daysSupply => {
  if (daysSupply && daysSupply.value && daysSupply.unit) {
    return daysSupply.value + " " + daysSupply.unit;
  }
  return missingField;
};

const getMedDispenseQuantity = quantity => {
  if (quantity && quantity.value && quantity.unit) {
    return quantity.value + " " + quantity.unit;
  }
  return missingField;
};

const getMedDispenseName = medicationCodeableConcept => {
  if (medicationCodeableConcept && medicationCodeableConcept.text) {
    return medicationCodeableConcept.text;
  }
  return missingField;
};

const mapPractitionerSTU2 = fhirPractResource => ({
  name: getPractName(fhirPractResource.name),
  id: fhirPractResource.id ? fhirPractResource.id : missingField,
  gender: "Undefined in STU2",
  birthDate: "Undefined in STU2",
  photo: "Undefined in STU2"
});

const getPractName = name => {
  if (name && name.given && name.given[0] && name.family) {
    return name.given[0] + " " + name.family;
  }
  return missingField;
};

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

const formatBirthDate = birthDate => {
  if (birthDate) {
    return new Date(birthDate).toLocaleDateString("en-uk");
  }
  return missingField;
};

const getChildIDSTU2 = currentUserResource => {
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
  mapPatientToUserSTU2,
  mapAppointmentSTU2,
  mapConditionSTU2,
  mapMedicationSTU2,
  mapMedicationDispenseSTU2,
  mapCarePlanSTU2,
  mapPractitionerSTU2,
  getChildIDSTU2
};
