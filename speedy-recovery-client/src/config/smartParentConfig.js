const smartSandboxConfigs = {
  // Provider launch (provider is Joseph P Nichols, sees three patients including Shelby Von)
  parentSandbox_1:
    "https://launch.smarthealthit.org/v/r3/sim/eyJrIjoiMSIsImoiOiIxIiwiYiI6ImYwNDYyOTM2LWViNGItNGRhMS1iNDVhLWZiZD" +
    "k2ZWJmOGNjYiwxYzVjYzZmZC02NzlhLTRmYTctOGNjNS0wZTY2NzcwNzEwMmQifQ/fhir"
};

const smartParentConfig = {
  client: {
    client_id: "ucl_speedy_recovery",
    scope: "patient/*.read launch/patient launch/todo openid fhirUser"
  },
  server: smartSandboxConfigs.parentSandbox_1
};

export default smartParentConfig;
