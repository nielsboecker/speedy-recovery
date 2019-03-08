const smartSandboxConfigs = {
  parentSandbox_1:
    "http://launch.smarthealthit.org/v/r3/sim/eyJrIjoiMSIsImoiOiIxIiwiYiI6IjhhNWZkMGQ2LWEyOGEtNGM5NC1iZmNhLWI5NmZlNjZhMzkzZDQifQ/fhir"
};

const smartParentConfig = {
  client: {
    client_id: "ucl_speedy_recovery",
    scope: "patient/*.read launch/patient launch/todo openid fhirUser"
  },
  server: smartSandboxConfigs.parentSandbox_1
};

export default smartParentConfig;
