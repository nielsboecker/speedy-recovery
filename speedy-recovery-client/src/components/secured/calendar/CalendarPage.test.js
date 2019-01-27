import React from 'react';
import ReactDOM from 'react-dom';
import CalendarPage from "./CalendarPage";
import AppointmentData from './test_files/smallAppointmentList.json';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CalendarPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe ('test fhir json to calendar conversion', () => {

  const wrapper = mount (
      <CalendarPage />
  );

  it('data and events are empty when no data input', () => {


    // expect(wrapper.state().events).toEqual([]);
    // expect(wrapper.state().data).toEqual(AppointmentData);

  });

  it('data converted properly from json to calendar format', () => {

    wrapper.setState({data: AppointmentData});

    //appointment 1
    expect(wrapper.state().events[0].id).toEqual('example');
    expect(wrapper.state().events[0].title).toEqual('Brian MRI results discussion');
    expect(wrapper.state().events[0].status).toEqual('booked');
    expect(wrapper.state().events[0].reason).toEqual('General Discussion');
    expect(wrapper.state().events[0].priority).toEqual(5);
    expect(wrapper.state().events[0].description).toEqual('Discussion on the results of your recent MRI');
    expect(wrapper.state().events[0].start).toEqual(new Date('2019-01-01T09:00:00Z'));
    expect(wrapper.state().events[0].end).toEqual(new Date('2019-01-01T11:00:00Z'));
    expect(wrapper.state().events[0].comment).toEqual('Further expand on the results of the MRI and determine the' +
                                                      ' next actions that may be appropriate.');
    expect(wrapper.state().events[0].patient).toEqual('Peter James Chalmers');
    expect(wrapper.state().events[0].practitioner).toEqual('Dr Adam Careful');
    expect(wrapper.state().events[0].location).toEqual('South Wing, second floor');

    //appointment 2
    expect(wrapper.state().events[1].id).toEqual('example2');
    expect(wrapper.state().events[1].title).toEqual('CT results discussion');
    expect(wrapper.state().events[1].status).toEqual('booked');
    expect(wrapper.state().events[1].reason).toEqual('General Discussion');
    expect(wrapper.state().events[1].priority).toEqual(5);
    expect(wrapper.state().events[1].description).toEqual('Discussion on the results of your recent CT');
    expect(wrapper.state().events[1].start).toEqual(new Date('2019-01-15T11:00:00Z'));
    expect(wrapper.state().events[1].end).toEqual(new Date('2019-01-15T13:00:00Z'));
    expect(wrapper.state().events[1].comment).toEqual('Further expand on the results of the CT and determine the ' +
        'next steps that may be appropriate.');
    expect(wrapper.state().events[1].patient).toEqual('Joe James Bloggs');
    expect(wrapper.state().events[1].practitioner).toEqual('Dr Adam Doctors');
    expect(wrapper.state().events[1].location).toEqual('North Wing, third floor');

  });


});


