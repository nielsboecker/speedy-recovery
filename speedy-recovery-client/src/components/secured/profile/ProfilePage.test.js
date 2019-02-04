import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ProfilePage from "./ProfilePage";
import exampleUser from "./test_files/ExampleUser.json";

Enzyme.configure({ adapter: new Adapter() });

const emptyFunction = () => {
};

it("renders without crashing", () => {
  shallow(<ProfilePage onChange={emptyFunction} user={exampleUser}/>);
});
