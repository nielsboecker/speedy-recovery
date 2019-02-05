const mapPatientToUser = fhirPatientResource => ({
  role: fhirPatientResource.resourceType,
  birthDate: new Date(fhirPatientResource.birthDate),
  gender: fhirPatientResource.gender,
  name: fhirPatientResource.name.find(element => element.use === "usual").text,
  careProvider: fhirPatientResource.careProvider[0].display,
  language: fhirPatientResource.communication.find(element => element.preferred)
    .language.text,
  phone: fhirPatientResource.telecom.filter(
    element => element.system === "phone"
  ),
  email: fhirPatientResource.telecom.find(element => element.system === "email")
    .value
});

const mapAppointment = fhirAppResource => ({
  id: fhirAppResource.id,
  title: fhirAppResource.text.div.substring(
    42,
    fhirAppResource.text.div.length - 6
  ),
  status: fhirAppResource.status,
  reason: fhirAppResource.indication.display,
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

export { mapPatientToUser, mapAppointment };
