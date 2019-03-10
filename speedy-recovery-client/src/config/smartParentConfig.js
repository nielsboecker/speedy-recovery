const smartSandboxConfigs = {
  parentSandbox_1:
    "https://launch.smarthealthit.org/v/r3/sim/eyJrIjoiMSIsImoiOiIxIiwiYiI6IjIyMDA0MSJ9/fhir"

};

const smartParentConfig = {
  client: {
    client_id: "ucl_speedy_recovery",
    scope: "patient/*.read launch/patient launch/todo openid fhirUser"
  },
  server: smartSandboxConfigs.parentSandbox_1
};

export default smartParentConfig;
