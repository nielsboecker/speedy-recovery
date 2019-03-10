import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import exampleAppointment from "../test_input/internal/ExampleAppointment";
import ParentModal from "../../components/secured/calendar/parent/ParentModal";

Enzyme.configure({ adapter: new Adapter() });

it("parentmodal renders", () => {
  shallow(
    <ParentModal
      appointment={exampleAppointment}
      toggleEditModal={jest.fn()}
      isEditModalOpen={false}
    />
  );
});
