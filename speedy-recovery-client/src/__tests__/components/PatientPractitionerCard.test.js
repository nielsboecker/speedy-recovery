import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PatientPractitionerCard from "../../components/secured/calendar/patient/PatientPractitionerCard";

Enzyme.configure({ adapter: new Adapter() });

it("patientpractitionercard renders", () => {
  shallow(
    <PatientPractitionerCard selectedPractitioner={{}} backendInfo={{}} />
  );
});
