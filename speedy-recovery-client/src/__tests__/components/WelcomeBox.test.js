import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WelcomeBox from "../../components/landing/start/WelcomeBox";

Enzyme.configure({ adapter: new Adapter() });

it("welcome box renders", () => {
  shallow(<WelcomeBox onClick={jest.fn()} />);
});
