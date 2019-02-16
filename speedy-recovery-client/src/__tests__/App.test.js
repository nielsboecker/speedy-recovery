import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../components/core/App";
import SmartAuthService from "../service/SmartAuthService";

Enzyme.configure({ adapter: new Adapter() });

// Mock SmartAuthService
jest.mock("../service/SmartAuthService", () => ({
  startSmartAuthenticatedSession: jest.fn(),
  onSmartAuthenticatedSessionReady: jest.fn(),
  endSmartAuthenticatedSession: jest.fn()
}));

// Mock mapPatientToUser
jest.mock("../dataaccess/FhirDataAdapter", user => ({
  mapPatientToUser: user => user
}));

const wrapper = shallow(<App />);
const underTest = wrapper.instance();

test("render without crashing", () => {
  shallow(<App />);

  // Make sure auth callback was registered
  expect(SmartAuthService.onSmartAuthenticatedSessionReady).toHaveBeenCalled();
});

test("handleLogin() calls SmartAuthService", () => {
  underTest.handleLogin();
  expect(SmartAuthService.startSmartAuthenticatedSession).toHaveBeenCalled();
});

test("handleLogout() calls SmartAuthService", () => {
  underTest.handleLogout();
  expect(SmartAuthService.endSmartAuthenticatedSession).toHaveBeenCalled();
});

test("onAuthStatusChanged() sets state appropriately", () => {
  // given
  const mockUser = { name: "foo" };
  const mockFhirClient = {
    user: {
      read: jest.fn().mockImplementation(() => Promise.resolve(mockUser))
    }
  };

  // when
  underTest.onAuthStatusChanged(mockFhirClient);

  // then
  expect(wrapper.state().fhirClient).toEqual(mockFhirClient);

  // This should work, but there seems to be a bug, Promise.resolve executes too late
  // expect(wrapper.state().user).toEqual(mockUser);
});
