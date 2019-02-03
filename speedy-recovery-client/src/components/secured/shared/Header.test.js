import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

it("renders without crashing", () => {
  const div = document.createElement("div");

  // Note: MemoryRouter needed as there are Link components in Header
  const component = (
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  ReactDOM.render(component, div);
  ReactDOM.unmountComponentAtNode(div);
});
