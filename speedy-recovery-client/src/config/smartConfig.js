const smartSandboxConfigs = {
  // stand-alone patient launch for Shelby
  patientSandbox_1: "https://launch.smarthealthit.org/v/r3/sim/eyJrIjoiMSIsImIiOiJkMGQwY2RlMC00YjIxLTQyZjYtOWMxZS1iZmE0NDdkNzIwNTkifQ/fhir"
};

const smartConfig  = {
  client: {
    client_id: "ucl_speedy_recovery",
    scope:  "patient/*.read launch/patient launch/todo openid fhirUser"
  },
  server: smartSandboxConfigs.patientSandbox_1
};

export default smartConfig;
