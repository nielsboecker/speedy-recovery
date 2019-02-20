// STU3 SMART FHIR server
const serverMetadataEndpoint = "https://r3.smarthealthit.org/metadata";

const minimumSupportedVersion = "3.0.1";

const requiredResources = [
  "Patient",
  "Practitioner",
  "RelatedPerson",
  "Appointment",
  "Condition",
  "Medication"
];

export { serverMetadataEndpoint, minimumSupportedVersion, requiredResources };
