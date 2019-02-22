import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FooterInSecuredPages from "../../components/secured/shared/Footer";
import FooterInStartPage from "../../components/landing/start/Footer";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  shallow(<FooterInSecuredPages />);
});

it("renders without crashing", () => {
  shallow(<FooterInStartPage />);
});
