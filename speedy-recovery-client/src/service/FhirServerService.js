import { fhirServer_smartSandboxStu3 } from "../config/serverConfig";

const supportedFhirVersions = ["1.0.2", "3.0.1"];
const requiredResources = [
  "Patient",
  "Practitioner",
  "RelatedPerson",
  "Appointment",
  "Condition",
  "Medication"
];

const checkFhirCapabilityStatement = async () => {
  return new Promise((resolve, reject) => {
    fetch(fhirServer_smartSandboxStu3)
      .then(response => response.json())
      .then(capabilityStatement => {
        if (
          isValidCapabilityStatement(capabilityStatement) &&
          fhirVersionIsSupported(capabilityStatement) &&
          allRequiredResourcesAvailable(capabilityStatement)
        ) {
          resolve(capabilityStatement);
        }
        // If we run into trouble, we can add more detailed error logs, to find out what went wrong
        else reject("FHIR server requirements not met");
      })
      .catch(() => reject("FHIR server not responding"));
  });
};

const isValidCapabilityStatement = response => {
  return (
    (response.resourceType === "CapabilityStatement" ||
      response.resourceType === "Conformance") &&
    response.fhirVersion &&
    response.rest &&
    response.rest[0].resource
  );
};

// For now, we only support the exact version currently running in the sandbox
const fhirVersionIsSupported = capabilityStatement =>
  supportedFhirVersions.includes(capabilityStatement.fhirVersion);

// For now, we only require READ access for selected resources
const allRequiredResourcesAvailable = capabilityStatement => {
  const availableResources = capabilityStatement.rest[0].resource
    .filter(resource =>
      resource.interaction.find(interaction => interaction.code === "read")
    )
    .map(resource => resource.type);
  return requiredResources.every(resource =>
    availableResources.includes(resource)
  );
};

export default {
  checkFhirCapabilityStatement
};
