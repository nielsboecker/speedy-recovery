// TODO: Many different versions of fields like name, make more resilient (and be careful to work with V3!)
// TODO: Add different mappings for different FHIR versions (as a proof of concept)

// FIXME: Update mapping
// arrow function with parameter

const mapPatientToUser = fhirPatientResource => ({
  //This is a temporary hard-code fix as we have not implemented the searching for a patients' parent
  role:
    fhirPatientResource.id === "f0462936-eb4b-4da1-b45a-fbd96ebf8ccb"
      ? "Parent"
      : fhirPatientResource.resourceType,
  birthDate: fhirPatientResource.birthDate,
  gender: fhirPatientResource.gender,
  name: getName(fhirPatientResource.name) || "Unknown",
  careProvider: fhirPatientResource.careprovider || "Unknown",
  //languagePreferred:"Unknown" || fhirPatientResource.communication[0].language.coding[0].display,
  address:
    fhirPatientResource.address[0].line[0] +
    ", " +
    fhirPatientResource.address[0].city +
    ", " +
    fhirPatientResource.address[0].state +
    ", " +
    fhirPatientResource.address[0].postalCode +
    ", " +
    fhirPatientResource.address[0].country,
  phone:
    fhirPatientResource.telecom.filter(element => element.system === "phone") ||
    [],
  email: fhirPatientResource.email || "Unknown"
});

const getName = name => {
  const familyName = name[0].family;
  console.log("Family name is " + familyName);
  let firstName = name[0].given;
  console.log("First name is " + firstName);
  if(firstName.length>1){
    firstName = firstName.join(" "); 
  }
  const fullName = firstName + " " + familyName;
  console.log("FULLNAME " + fullName);
  return fullName;
};

const mapAppointment = fhirAppResource => ({
  id: fhirAppResource.id,
  title: fhirAppResource.text.div.substring(
    42,
    fhirAppResource.text.div.length - 6
  ),
  status: fhirAppResource.status,
  appType: fhirAppResource.appointmentType.coding[0].display,
  indication: fhirAppResource.indication[0].display,
  priority: fhirAppResource.priority,
  description: fhirAppResource.description,
  supportingInfo: fhirAppResource.supportingInformation[0].reference, //TODO: Fix for multiple supporting info
  start: new Date(fhirAppResource.start),
  end: new Date(fhirAppResource.end),
  created: new Date(fhirAppResource.created),
  comment: fhirAppResource.comment,
  patient: fhirAppResource.participant[0].actor.display,
  practitioner: fhirAppResource.participant[1].actor.display,
  location: fhirAppResource.participant[2].actor.display
});

const mapCondition = fhirCondResource => ({
  clinicalStatus: fhirCondResource.clinicalStatus,
  verificationStatus: fhirCondResource.verificationStatus,
  severity: fhirCondResource.severity.coding[0].display,
  summary: fhirCondResource.code.text,
  bodySite: fhirCondResource.bodySite[0].text,
  onsetDateTime: new Date(fhirCondResource.onsetDateTime)
});

const mapMedication = fhirMedResource => ({
  id: fhirMedResource.id,
  producer: fhirMedResource.contained[0].name,
  name: fhirMedResource.code.coding[0].display,
  isBrand: fhirMedResource.isBrand,
  isOverTheCounter: fhirMedResource.isOverTheCounter,
  form: fhirMedResource.form.coding[0].display,
  content:
    fhirMedResource.package.content[0].itemCodeableConcept.coding[0].display,
  imageURL: fhirMedResource.image[0].title
});

export { mapPatientToUser, mapAppointment, mapCondition, mapMedication };
