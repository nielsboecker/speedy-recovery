import React from "react";
import "jest-localstorage-mock";
import App from "../components/core/App";
import ErrorPage from "../components/error/ErrorPage";
import SecuredMainPage from "../components/secured/core/SecuredMainPage";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router-dom";
import LandingMainPage from "../components/landing/core/LandingMainPage";

Enzyme.configure({ adapter: new Adapter() });

// Mock BrowserRouter
jest.mock("react-router-dom/BrowserRouter", () => {
  return ({ children }) => <div>{children}</div>;
});

test("show error page for invalid URL", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/foobar"]}>
      <App/>
    </MemoryRouter>
  );
  // console.log(wrapper.debug());
  expect(wrapper.find(ErrorPage)).toHaveLength(1);
  expect(wrapper.find(LandingMainPage)).toHaveLength(0);
  expect(wrapper.find(SecuredMainPage)).toHaveLength(0);
});

// TODO: Could add more, like e.g. /conversations/2 actually shows conversation #2