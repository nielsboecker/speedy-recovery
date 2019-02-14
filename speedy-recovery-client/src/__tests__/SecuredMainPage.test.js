import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router-dom";
import SecuredMainPage from "../components/secured/core/SecuredMainPage";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  mount(
    <MemoryRouter>
      <SecuredMainPage
        user={{}}
        match={{ url: "foo" }}
      />
    </MemoryRouter>
  );
});
