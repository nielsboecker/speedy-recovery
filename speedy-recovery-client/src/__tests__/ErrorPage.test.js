import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ErrorPage from "../components/error/ErrorPage";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  shallow(<ErrorPage error={{ rootCause: "", message: "" }} />);
});
