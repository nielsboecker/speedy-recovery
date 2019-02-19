import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import HomePage from "../../components/secured/home/HomePage";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  shallow(<HomePage />);
});
