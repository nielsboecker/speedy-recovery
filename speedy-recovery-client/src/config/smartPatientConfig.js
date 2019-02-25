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
