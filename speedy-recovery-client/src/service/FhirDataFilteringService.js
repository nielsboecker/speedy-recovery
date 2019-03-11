const filterPatientResource = resource => {
  // resourceType, surname, careprovider
  if (
    resource &&
    resource.name &&
    resource.name[0] &&
    resource.name[0].family &&
    resource.resourceType
  ) {
    return resource;
  }
  return null;
};

const filterAppointmentResource = resource => {
  if (
    resource &&
    resource.participant[2] &&
    resource.participant[2].actor &&
    resource.participant[2].actor.display &&
    resource.text &&
    resource.text.div &&
    resource.start &&
    resource.end
  ) {
    return resource;
  }
  return null;
};

const filterConditionResource = resource => {
  if (
    resource &&
    resource.severity &&
    resource.severity.coding[0] &&
    resource.severity.coding[0].display &&
    resource.code &&
    resource.code.text
  ) {
    return resource;
  }
  return null;
};

const filterMedicationResource = resource => {
  if (
    resource &&
    resource.code &&
    resource.code.coding[0] &&
    resource.code.coding[0].display &&
    resource.isOverTheCounter + ""
  ) {
    return resource;
  }
  return null;
};

const filterPractitionerResource = resource => {
  if (
    resource &&
    resource.name &&
    resource.name[0] &&
    resource.name[0].given &&
    resource.name[0].given[0] &&
    resource.name[0].family &&
    resource.id
  ) {
    return resource;
  }
  return null;
};

const filterMedicationDispenseResource = resource => {
  if (
    resource &&
    resource.medicationCodeableConcept &&
    resource.medicationCodeableConcept.text &&
    resource.id
  ) {
    return resource;
  }
  return null;
};

const filterCarePlanResource = resource => {
  if (
    resource &&
    resource.category &&
    resource.category[0] &&
    resource.category[0].coding &&
    resource.category[0].coding[0] &&
    resource.category[0].coding[0].display &&
    resource.id
  ) {
    return resource;
  }
  return null;
};

export {
  filterPatientResource,
  filterAppointmentResource,
  filterConditionResource,
  filterMedicationResource,
  filterPractitionerResource,
  filterMedicationDispenseResource,
  filterCarePlanResource
};
