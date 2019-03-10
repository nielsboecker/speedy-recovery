import axios from "axios";

const getBackendPractitionerInfo = practitionerID => {
  return axios
    .get(
      `https://speedy-recovery-server.azurewebsites.net/practitioners?userid=${practitionerID}`
    )
    .catch(error => console.log("No extra info: " + error));
};

export default {
  getBackendPractitionerInfo
};
