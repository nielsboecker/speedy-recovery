import {
  mapAppointmentSTU2,
  mapConditionSTU2,
  mapMedicationSTU2,
  mapPatientToUserSTU2
} from "./FhirMappingAdapterDSTU2";
import {
  mapAppointmentSTU3,
  mapConditionSTU3,
  mapMedicationSTU3,
  mapPatientToUserSTU3
} from "./FhirMappingAdapterSTU3";

const fhirMapPatient = (resource, version) => {
  if (version) {
    switch (version[0]) {
      case "1":
      case "2":
        return mapPatientToUserSTU2(resource);
      case "3":
        return mapPatientToUserSTU3(resource);
      default:
        console.log("Invalid version of FHIR resource provided: ", version);
    }
  }
  console.log("No FHIR version has been supplied");
};

const fhirMapAppointment = (resource, version) => {
  if (version) {
    switch (version[0]) {
      case "1":
      case "2":
        return mapAppointmentSTU2(resource);
      case "3":
        return mapAppointmentSTU3(resource);
      default:
        console.log("App Invalid version of FHIR resource provided: ", version);
    }
  }
  console.log("No FHIR version has been supplied");
};

const fhirMapCondition = (resource, version) => {
  if (version) {
    switch (version[0]) {
      case "1":
      case "2":
        return mapConditionSTU2(resource);
      case "3":
        return mapConditionSTU3(resource);
      default:
        console.log("Invalid version of FHIR resource provided: ", version);
    }
  }
  console.log("No FHIR version has been supplied");
};

const fhirMapMedication = (resource, version) => {
  if (version) {
    switch (version[0]) {
      case "1":
      case "2":
        return mapMedicationSTU2(resource);
      case "3":
        return mapMedicationSTU3(resource);
      default:
        console.log("Invalid version of FHIR resource provided: ", version);
    }
  }
  console.log("No FHIR version has been supplied");
};

const getChild = (currentUserResource) => {
  if (
      currentUserResource &&
      currentUserResource.link &&
      currentUserResource.link[0].other &&
      currentUserResource.link[0].other.reference
  ) {
    const patient = currentUserResource.link[0].other.reference;
    const child=patient.split("/")[1];
    return child;
  }
  return null;
};

export {
  fhirMapPatient,
  fhirMapAppointment,
  fhirMapCondition,
  fhirMapMedication,
  getChild
};
