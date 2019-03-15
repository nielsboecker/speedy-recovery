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

/* This file defines the FHIR server endpoint as well as any required resources and minimum version that we support.
 */

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
