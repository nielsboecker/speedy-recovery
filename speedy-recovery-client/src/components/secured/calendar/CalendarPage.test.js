import React from 'react';
import ReactDOM from 'react-dom';
import CalendarPage from "./CalendarPage";
import AppointmentData from './test_files/appointmentExample.json';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CalendarPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe ('test fhir json to calendar conversion', () => {

  it('data and events are empty when no data input', () => {

    const wrapper = mount(
        <CalendarPage />
    );

    expect(wrapper.state().events).toEqual([]);
    expect(wrapper.state().data).toEqual([]);

  });

  it('data converted properly from json to calendar format', () => {

    const wrapper = mount (
        <CalendarPage />
    );

    wrapper.setState({data: AppointmentData});

    expect(wrapper.state().events[0].id).toEqual('example');
    expect(wrapper.state().events[0].title).toEqual('<div>Brian MRI results discussion</div>');
    expect(wrapper.state().events[0].status).toEqual('booked');
    expect(wrapper.state().events[0].reason).toEqual('General Discussion');
    expect(wrapper.state().events[0].priority).toEqual(5);
    expect(wrapper.state().events[0].description).toEqual('Discussion on the results of your recent MRI');
    expect(wrapper.state().events[0].start).toEqual(new Date('2013-12-10T09:00:00Z'));
    expect(wrapper.state().events[0].end).toEqual(new Date('2013-12-10T11:00:00Z'));
    expect(wrapper.state().events[0].comment).toEqual('Further expand on the results of the MRI and determine the' +
                                                      ' next actions that may be appropriate.');
    expect(wrapper.state().events[0].patient).toEqual('Peter James Chalmers');
    expect(wrapper.state().events[0].practitioner).toEqual('Dr Adam Careful');
    expect(wrapper.state().events[0].location).toEqual('South Wing, second floor');

  });
});


