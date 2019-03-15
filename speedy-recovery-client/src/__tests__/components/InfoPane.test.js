/*
 * Speedy Recovery -- A patient-centred app based on the FHIR standard facilitating communication between paediatric
 * patients, parents and hospital staff
 *
 * Copyright (C) 2019 University College London
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 * You should have received a copy of the GNU Affero General Public License along with this program. If not,
 * see http://www.gnu.org/license/.
 * */

/* This file tests the Pane component*/

import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import exampleUser from "../test_input/internal/ExampleUser.json";
import PatientBasicPane from "../../components/secured/patientinformation/PatientBasicPane";
import PatientCarePlanPane from "../../components/secured/patientinformation/PatientCarePlanPane";
import PatientConditionPane from "../../components/secured/patientinformation/PatientConditionPane";
import PatientMedicationDispensePane from "../../components/secured/patientinformation/PatientMedicationDispensePane";
import fhirExamplePatient from "../test_input/fhir_resources_stu3/FhirExamplePatientSTU3.json";
import fhirExamplePractitioner from "../test_input/fhir_resources_stu3/FhirExamplePractitionerSTU3.json";

Enzyme.configure({ adapter: new Adapter() });

it("PatientBasicPane renders without crashing", () => {
  shallow(
    <PatientBasicPane
      user={fhirExamplePractitioner}
      patient={fhirExamplePatient}
    />
  );
});

it("PatientBasicPane renders without crashing", () => {
  shallow(<PatientBasicPane user={exampleUser} patient={fhirExamplePatient} />);
});

it("PatientCarePlanPane renders without crashing", () => {
  shallow(<PatientCarePlanPane user={exampleUser} carePlans={["foo"]} />);
});

it("PatientConditionPane renders without crashing", () => {
  shallow(
    <PatientConditionPane
      user={exampleUser}
      conditions={[{ onsetDateTime: "foo" }]}
    />
  );
});

it("PatientMedicationDispensePane renders without crashing", () => {
  shallow(
    <PatientMedicationDispensePane
      user={exampleUser}
      medicationDispenses={["foo"]}
    />
  );
});
