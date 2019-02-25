const filterPatientResource = resource => {
  // resourceType, surname, careprovider
  if (
    resource &&
    resource.name &&
    resource.name[0] &&
    resource.name[0].family
  ) {
    const requiredFields = [resource.resourceType, resource.name[0].family];
    return requiredFields.every(element => element) ? resource : null;
  }
  return null;
};

const filterAppointmentResource = resource => {
  if (
    resource &&
    resource.participant[2] &&
    resource.participant[2].actor &&
    resource.participant[2].actor.display
  ) {
    // title, start, end, location
    const requiredFields = [
      resource.text.div,
      resource.start,
      resource.end,
      resource.participant[2].actor.display
    ];
    return requiredFields.every(element => element) ? resource : null;
  }
  return null;
};

const filterConditionResource = resource => {
  // severity, summary
  if (
    resource &&
    resource.severity &&
    resource.severity.coding[0] &&
    resource.severity.coding[0].display
  ) {
    const requiredFields = [
      resource.severity.coding[0].display,
      resource.code.text
    ];
    return requiredFields.every(element => element) ? resource : null;
  }
  return null;
};

const filterMedicationResource = resource => {
  if (
    resource &&
    resource.code &&
    resource.code.coding[0] &&
    resource.code.coding[0].display
  ) {
    // name, isOverTheCounter
    const requiredFields = [
      resource.code.coding[0].display,
      resource.isOverTheCounter + ""
    ];
    return requiredFields.every(element => element) ? resource : null;
  }
  return null;
};

export {
  filterPatientResource,
  filterAppointmentResource,
  filterConditionResource,
  filterMedicationResource
};
