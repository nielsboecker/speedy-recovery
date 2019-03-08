import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import exampleAppointment from "../test_input/internal/ExampleAppointment";
import PractitionerModal from "../../components/secured/calendar/practitioner/PractitionerModal";

Enzyme.configure({ adapter: new Adapter() });

it("practitionermodal renders", () => {
  shallow(<PractitionerModal appointment={exampleAppointment} toggleEditModal={jest.fn()} isEditModalOpen={false} />);
});
