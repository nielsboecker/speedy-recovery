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

/* This file tests the Pane component for patient, parent and staff views.*/

import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import exampleUser from "../test_input/internal/ExampleUser.json";
import PatientBasicPane from "../../components/secured/patientinformation/Patient/PatientBasicPane";
import PatientCarePlanPane from "../../components/secured/patientinformation/Patient/PatientCarePlanPane";
import PatientConditionPane from "../../components/secured/patientinformation/Patient/PatientConditionPane";
import PatientMedicationDispensePane from "../../components/secured/patientinformation/Patient/PatientMedicationPane";
import ParentBasicPane from "../../components/secured/patientinformation/Parent/ParentBasicPane";
import ParentCarePlanPane from "../../components/secured/patientinformation/Parent/ParentCarePlanPane";
import ParentConditionPane from "../../components/secured/patientinformation/Parent/ParentConditionPane";
import ParentMedicationDispensePane from "../../components/secured/patientinformation/Parent/ParentMedicationPane";
import ParentDrPane from "../../components/secured/patientinformation/Parent/ParentDrPane";
import PractitionerBasicPane from "../../components/secured/patientinformation/Practitioner/PractitionerBasicPane";
import PractitionerCarePlanPane from "../../components/secured/patientinformation/Practitioner/PractitionerCarePlanPane";
import PractitionerConditionPane from "../../components/secured/patientinformation/Practitioner/PractitionerConditionPane";
import PractitionerFamilyHistoryPane from "../../components/secured/patientinformation/Practitioner/PractitionerFamilyHistoryPane";
import PractitionerGoalPane from "../../components/secured/patientinformation/Practitioner/PractitionerGoalPane";
import PractitionerMedicationDispensePane from "../../components/secured/patientinformation/Practitioner/PractitionerMedicationPane";
import fhirExamplePractitioner from "../test_input/fhir_resources_stu3/FhirExamplePractitionerSTU3.json";

Enzyme.configure({ adapter: new Adapter() });

it("PatientBasicPane renders without crashing", () => {
  shallow(<PatientBasicPane user={{ gender: "female" }} />);
});

it("PatientBasicPane renders without crashing", () => {
  shallow(<PatientBasicPane user={exampleUser} />);
});

it("PatientCarePlanPane renders without crashing", () => {
  mount(<PatientCarePlanPane carePlans={["foo"]} />);
});

it("PatientConditionPane renders without crashing", () => {
  mount(<PatientConditionPane conditions={[{ onsetDateTime: "foo" }]} />);
});

it("PatientMedicationDispensePane renders without crashing", () => {
  mount(<PatientMedicationDispensePane medicationDispenses={["foo"]} />);
});

it("ParentBasicPane renders without crashing", () => {
  shallow(<ParentBasicPane childResource={{ gender: "female" }} />);
});

it("ParentBasicPane renders without crashing", () => {
  shallow(<ParentBasicPane childResource={exampleUser} />);
});

it("ParentCarePlanPane renders without crashing", () => {
  mount(<ParentCarePlanPane childResource={exampleUser} carePlans={["foo"]} />);
});

it("ParentConditionPane renders without crashing", () => {
  mount(
    <ParentConditionPane
      childResource={exampleUser}
      conditions={[{ onsetDateTime: "foo" }]}
    />
  );
});

it("ParentMedicationDispensePane renders without crashing", () => {
  mount(
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

it("PractitionerBasicPane renders without crashing", () => {
  shallow(<PractitionerBasicPane patient={{ gender: "female" }} />);
});

it("PractitionerBasicPane renders without crashing", () => {
  shallow(<PractitionerBasicPane patient={exampleUser} />);
});

it("PractitionerBasicPane renders without crashing", () => {
  mount(<PractitionerBasicPane patient={{ gender: "pending" }} />);
});

it("PractitionerCarePlanPane renders without crashing", () => {
  mount(<PractitionerCarePlanPane carePlans={["foo"]} />);
});

it("PractitionerConditionPane renders without crashing", () => {
  mount(<PractitionerConditionPane conditions={[{ onsetDateTime: "foo" }]} />);
});

it("PractitionerFamilyHistoryPane renders without crashing", () => {
  mount(<PractitionerFamilyHistoryPane familyHistories={["foo"]} />);
});

it("PractitionerGoalPane renders without crashing", () => {
  mount(<PractitionerGoalPane goal={["foo"]} />);
});

it("PractitionerMedicationDispensePane renders without crashing", () => {
  mount(<PractitionerMedicationDispensePane medicationDispenses={["foo"]} />);
});
