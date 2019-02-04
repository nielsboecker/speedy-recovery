import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ProfilePage from "../components/secured/profile/ProfilePage";
import exampleUser from "./test_input/internatl/ExampleUser.json";

Enzyme.configure({ adapter: new Adapter() });

const emptyFunction = () => {
};

it("renders without crashing", () => {
  shallow(<ProfilePage onChange={emptyFunction} user={exampleUser}/>);
});
