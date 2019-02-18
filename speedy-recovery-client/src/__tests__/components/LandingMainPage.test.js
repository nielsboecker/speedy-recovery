import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LandingMainPage from "../../components/landing/core/LandingMainPage";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  shallow(<LandingMainPage />);
});
