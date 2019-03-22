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
import PatientBasicPane from "../../components/secured/patientinformation/Patient/PatientBasicPane";
import PatientCarePlanPane from "../../components/secured/patientinformation/Patient/PatientCarePlanPane";
import PatientConditionPane from "../../components/secured/patientinformation/Patient/PatientConditionPane";
import PatientMedicationDispensePane from "../../components/secured/patientinformation/Patient/PatientMedicationDispensePane";
import ParentBasicPane from "../../components/secured/patientinformation/Parent/ParentBasicPane";
import ParentCarePlanPane from "../../components/secured/patientinformation/Parent/ParentCarePlanPane";
import ParentConditionPane from "../../components/secured/patientinformation/Parent/ParentConditionPane";
import ParentMedicationDispensePane from "../../components/secured/patientinformation/Parent/ParentMedicationPane";
import ParentDrPane from "../../components/secured/patientinformation/Parent/ParentDrPane";
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

it("ParentBasicPane renders without crashing", () => {
  shallow(
    <ParentBasicPane
      childResource={fhirExamplePractitioner}
      patient={fhirExamplePatient}
    />
  );
});

it("ParentBasicPane renders without crashing", () => {
  shallow(
    <ParentBasicPane childResource={exampleUser} patient={fhirExamplePatient} />
  );
});

it("ParentCarePlanPane renders without crashing", () => {
  shallow(
    <ParentCarePlanPane childResource={exampleUser} carePlans={["foo"]} />
  );
});

it("ParentConditionPane renders without crashing", () => {
  shallow(
    <ParentConditionPane
      childResource={exampleUser}
      conditions={[{ onsetDateTime: "foo" }]}
    />
  );
});

it("ParentMedicationDispensePane renders without crashing", () => {
  shallow(
    <ParentMedicationDispensePane
      childResource={exampleUser}
      medicationDispenses={["foo"]}
    />
  );
});

it("ParentDrPane renders without crashing", () => {
  shallow(
    <ParentDrPane
      childResource={exampleUser}
      patientPractitioners={[fhirExamplePractitioner]}
    />
  );
});
