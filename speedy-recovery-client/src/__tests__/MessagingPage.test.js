import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MessagingPage from "../components/secured/messaging/MessagingPage";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  shallow(<MessagingPage />);
});
