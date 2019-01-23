import React from 'react';
import ReactDOM from 'react-dom';
import CalendarPage from "./CalendarPage";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CalendarPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('test json conversion', () => {

});

