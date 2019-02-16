import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WelcomeBox from "../components/landing/start/WelcomeBox";
import UserModal from "../components/landing/start/UserModal";

Enzyme.configure({ adapter: new Adapter() });

it("usermodal renders", () => {
  shallow(<UserModal onClick={jest.fn()} />);
});
