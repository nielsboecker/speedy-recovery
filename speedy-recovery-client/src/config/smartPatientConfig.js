const smartSandboxConfigs = {
  // Patient launch (Shelby Von, ID = d0d0cde0-4b21-42f6-9c1e-bfa447d72059)
  patientSandbox_1:
    "https://launch.smarthealthit.org/v/r3/sim/eyJrIjoiMSIsImIiOiJkMGQwY2RlMC00YjIxLTQyZjYtOWMxZS1iZmE0NDdkNzIw" +
    "NTkifQ/fhir"
};

const smartPatientConfig = {
  client: {
    client_id: "ucl_speedy_recovery",
    scope: "patient/*.read launch/patient launch/todo openid fhirUser"
  },
  server: smartSandboxConfigs.patientSandbox_1
};

export default smartPatientConfig;
