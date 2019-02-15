const smartSandboxConfigs = {
  // Provider launch (provider is Joseph P Nichols, sees three patients including Shelby Von)
  providerSandbox_1:
    "https://launch.smarthealthit.org/v/r3/sim/eyJoIjoiMSIsImIiOiJkMGQwY2RlMC00YjIxLTQyZjYtOWMxZS1iZm" +
    "E0NDdkNzIwNTksc21hcnQtNzc3NzcwMSwyMmE5YmMyYi0wYTE1LTRkZGItODUxOC0xYTZmMGQ4MWEyODYiLCJlIjoic21hcnQt" +
    "UHJhY3RpdGlvbmVyLTcyMDgwNDE2In0/fhir"
};

const smartProviderConfig = {
  client: {
    client_id: "ucl_speedy_recovery",
    scope: "patient/*.read launch/patient launch/todo openid fhirUser"
  },
  server: smartSandboxConfigs.providerSandbox_1
};

export default smartProviderConfig;
