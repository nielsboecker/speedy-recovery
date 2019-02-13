// TODO: Many different versions of fields like name, make more resilient (and be careful to work with V3!)
// TODO: Add different mappings for different FHIR versions (as a proof of concept)

// FIXME: Update mapping
// arrow function with parameter
const mapPatientToUser = fhirPatientResource => ({
  role: fhirPatientResource.resourceType,
  birthDate: fhirPatientResource.birthDate,
  gender: fhirPatientResource.gender,
  name: fhirPatientResource.name[0].family || "Unknown",
  careProvider: "FIXME",
  language: "FIXME",
  email: "FIXME"
});


const mapAppointment = fhirAppResource => ({
  id: fhirAppResource.id,
  title: fhirAppResource.text.div.substring(
    42,
    fhirAppResource.text.div.length - 6
  ),
  status: fhirAppResource.status,
  reason: fhirAppResource.indication[0].display,
  priority: fhirAppResource.priority,
  description: fhirAppResource.description,
  start: new Date(fhirAppResource.start),
  end: new Date(fhirAppResource.end),
  created: new Date(fhirAppResource.created),
  comment: fhirAppResource.comment,
  patient: fhirAppResource.participant[0].actor.display,
  practitioner: fhirAppResource.participant[1].actor.display,
  location: fhirAppResource.participant[2].actor.display
});




export { mapPatientToUser, mapAppointment};
