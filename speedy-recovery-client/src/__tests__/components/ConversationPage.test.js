import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ConversationPage from "../../components/secured/conversation/ConversationPage";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  shallow(<ConversationPage />);
});
