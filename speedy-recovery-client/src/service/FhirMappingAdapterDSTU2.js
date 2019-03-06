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
  getSummary,
  getPractitionerId,
  getPractName
} from "./FhirDataMappingExtractionUtils";

const missingField = "Unknown";
const mapPatientToUserSTU2 = fhirPatientResource => ({
  id: fhirPatientResource.id ? fhirPatientResource.id : missingField,
  //This is a temporary hard-code fix as we have not implemented the searching for a patients' parent
  role:
    fhirPatientResource.id === "f0462936-eb4b-4da1-b45a-fbd96ebf8ccb"
      ? "Parent"
      : fhirPatientResource.resourceType,

  name: getName(fhirPatientResource.name),
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
  practitionerId: getPractitionerId(fhirAppResource.participant),
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

export {
  mapPatientToUserSTU2,
  mapAppointmentSTU2,
  mapConditionSTU2,
  mapMedicationSTU2,
  mapMedicationDispenseSTU2,
  mapCarePlanSTU2,
  mapPractitionerSTU2
};
