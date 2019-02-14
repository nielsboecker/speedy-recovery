const smartSandboxConfigs = {
  // Provider launch (provider is Joseph P Nichols, sees three patients including Shelby Von)
  providerSandbox_1:
    "https://launch.smarthealthit.org/v/r3/sim/eyJoIjoiMSIsImIiOiJkMGQwY2RlMC00YjIxLTQyZjYtOWMxZS1iZmE0NDdkNzIwNTks" +
    "c21hcnQtNzc3NzcwMSwyMmE5YmMyYi0wYTE1LTRkZGItODUxOC0xYTZmMGQ4MWEyODYiLCJlIjoic21hcnQtUHJhY3RpdGlvbmVyLTcyMDgw" +
    "NDE2In0/fhir"
};

const smartProviderConfig = {
  client: {
    client_id: "ucl_speedy_recovery",
    scope: "provider/*.read launch/provider launch/todo openid fhirUser"
  },
  server: smartSandboxConfigs.providerSandbox_1
};

export default smartProviderConfig;
