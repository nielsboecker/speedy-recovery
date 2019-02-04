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

// TODO: This test was written when the component still did the transformation. Now useless.
//  Should test if UI correctly displays the data instead.
it("displays data properly", () => {
  const underTest = shallow(<ProfilePage onChange={emptyFunction} user={exampleUser}/>);

  // Note: Currently, data is just loaded when component mounts. Later, this will happen once FHIR returns data.
  const user = underTest.state().user;
  expect(user.role).toEqual("Patient");
  expect(user.birthDate).toEqual("1985-08-01T00:00:00.000Z");
  expect(user.gender).toEqual("male");
  expect(user.name).toEqual("Jason Argonaut");
  expect(user.careProvider).toEqual("Physician Family Medicine");
  expect(user.language).toEqual("English");
  expect(user.phone).toHaveLength(4);
  expect(user.email).toEqual("open@epic.com");
});
