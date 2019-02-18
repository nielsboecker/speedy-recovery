import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MemoryRouter } from "react-router-dom";
import Header from "../../components/secured/shared/Header";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
});
