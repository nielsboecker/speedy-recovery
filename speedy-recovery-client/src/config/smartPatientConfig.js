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

/* This file contains the configuration of a sandbox which contains a patient.
 */

const smartSandboxConfigs = {
  // Patient launch (Shelby Von, ID = d0d0cde0-4b21-42f6-9c1e-bfa447d72059)
  patientSandbox_stu3_1:
    "https://launch.smarthealthit.org/v/r3/sim/eyJrIjoiMSIsImIiOiJkMGQwY2RlMC00YjIxLTQyZjYtOWMxZS1iZmE0NDdkNzIw" +
    "NTkifQ/fhir",
  patientSandbox_stu2_1:
    "https://launch.smarthealthit.org/v/r2/sim/eyJrIjoiMSIsImoiOiIxIiwiYiI6ImMxYmM2Y2NiLWM" +
    "1MzEtNGQ2Ny1iYjVlLWRkMWZhMjEwY2QxOCJ9/fhir"
};

const smartPatientConfig = {
  client: {
    client_id: "ucl_speedy_recovery",
    scope: "patient/*.read launch/patient launch/todo openid fhirUser"
  },
  server: smartSandboxConfigs.patientSandbox_stu3_1
};

export default smartPatientConfig;
