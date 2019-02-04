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

export { mapPatientToUser };
