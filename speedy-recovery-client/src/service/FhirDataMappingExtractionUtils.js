const getName = name => {
  if (name && name[0] && name[0].family && name[0].given) {
    let firstName = name[0].given;
    if (firstName.length > 1) {
      firstName = firstName.join(" ");
    }
    return firstName + " " + name[0].family;
  }
  return "Unknown";
};

const getPhone = telecom => {
  if (telecom) {
    const result = telecom.filter(element => element.system === "phone");
    if (result.length !== 0) {
      return result[0].value;
    }
  }
  return "Unknown";
};

const getPatient = participant => {
  if (
    participant &&
    participant[0] &&
    participant[0].actor &&
    participant[0].actor.display
  ) {
    return participant[0].actor.display;
  }
  return "Unknown";
};

const getPractitioner = participant => {
  if (
    participant &&
    participant[1] &&
    participant[1].actor &&
    participant[1].actor.display
  ) {
    return participant[1].actor.display;
  }
  return "Unknown";
};

const getLocation = participant => {
  if (
    participant &&
    participant[2] &&
    participant[2].actor &&
    participant[2].actor.display
  ) {
    return participant[2].actor.display;
  }
  return "Unknown";
};

const getSeverity = severity => {
  if (
    severity &&
    severity.coding &&
    severity.coding[0] &&
    severity.coding[0].display
  ) {
    return severity.coding[0].display;
  }
  return "Unknown";
};

const getSummary = summary => {
  if (summary && summary.text) {
    return summary.text;
  }
  return "Unknown";
};

const getbodySite = bodySite => {
  if (bodySite && bodySite[0] && bodySite[0].text) {
    return bodySite[0].text;
  }
  return "Unknown";
};

const getMedName = code => {
  if (code && code.coding && code.coding[0] && code.coding[0].display) {
    return code.coding[0].display;
  }
  return "Unknown";
};

const getForm = form => {
  if (form && form.coding && form.coding[0] && form.coding[0].display) {
    return form.coding[0].display;
  }
  return "Unknown";
};

export {
  getName,
  getPhone,
  getPatient,
  getPractitioner,
  getLocation,
  getSeverity,
  getSummary,
  getbodySite,
  getMedName,
  getForm
};
