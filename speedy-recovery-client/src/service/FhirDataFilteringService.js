const filterPatientResource = resource => {
  // resourceType, surname, careprovider
  const fields = [resource.resourceType, resource.name[0].family];
  return fields.includes(undefined) ? undefined : resource;
};

const filterAppointmentResource = resource => {
  // title, start, end, location
  const fields = [
    resource.text.div,
    resource.start,
    resource.end,
    resource.participant[2].actor.display
  ];
  return fields.includes(undefined) ? undefined : resource;
};

const filterConditionResource = resource => {
  // severity, summary
  const fields = [resource.severity.coding[0].display, resource.code.text];
  return fields.includes(undefined) ? undefined : resource;
};

const filterMedicationResource = resource => {
  // name, isOverTheCounter
  const fields = [resource.code.coding[0].display, resource.isOverTheCounter];
  return fields.includes(undefined) ? undefined : resource;
};

export {
  filterPatientResource,
  filterAppointmentResource,
  filterConditionResource,
  filterMedicationResource
};
