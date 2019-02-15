import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import WelcomeBox from "../components/landing/start/WelcomeBox";

Enzyme.configure({ adapter: new Adapter() });

const emptyFunction = () => {};

it("welcome box renders", () => {
  shallow(<WelcomeBox onClick={emptyFunction} />);

});
