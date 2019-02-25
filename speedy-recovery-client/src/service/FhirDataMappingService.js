import {
  mapAppointmentSTU2,
  mapConditionSTU2,
  mapMedicationSTU2,
  mapPatientToUserSTU2
} from "./FhirMappingAdapterSTU2";
import {
  mapAppointmentSTU3,
  mapConditionSTU3,
  mapMedicationSTU3,
  mapPatientToUserSTU3
} from "./FhirMappingAdapterSTU3";

const fhirMapPatient = (resource, version) => {
  if (version) {
    switch (version[0]) {
      case "2":
        return mapPatientToUserSTU2(resource);
      case "3":
        return mapPatientToUserSTU3(resource);
      default:
        console.log("Invalid version of FHIR resource provided: ", version);
    }
  }
};

const fhirMapAppointment = (resource, version) => {
  if (version) {
    switch (version[0]) {
      case "2":
        return mapAppointmentSTU2(resource);
      case "3":
        return mapAppointmentSTU3(resource);
      default:
        console.log("App Invalid version of FHIR resource provided: ", version);
    }
  }
};

const fhirMapCondition = (resource, version) => {
  switch (version[0]) {
    case "2":
      return mapConditionSTU2(resource);
    case "3":
      return mapConditionSTU3(resource);
    default:
      console.log("Invalid version of FHIR resource provided: ", version);
  }
};

const fhirMapMedication = (resource, version) => {
  switch (version[0]) {
    case "2":
      return mapMedicationSTU2(resource);
    case "3":
      return mapMedicationSTU3(resource);
    default:
      console.log("Invalid version of FHIR resource provided: ", version);
  }
};

export {
  fhirMapPatient,
  fhirMapAppointment,
  fhirMapCondition,
  fhirMapMedication
};
