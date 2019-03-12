/*
 * Speedy Recovery -- A patient-centred app based on the FHIR standard facilitating communication between paediatric
 * patients, parents and hospital staff
 *
 * Copyright (C) 2019 University College London
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not,
 * see http://www.gnu.org/license/.
 * */

/* This file contains functionality to check the capability statement of a fhir server and pass it to our application.
 */

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
