import React from 'react';
import ProfilePage from './ProfilePage';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    shallow(<ProfilePage/>);
});

it('converts data from FHIR format to expected internal format properly', () => {
    const underTest = shallow(<ProfilePage/>);

    // Note: Currently, data is just loaded when component mounts. Later, this will happen once FHIR returns data.
    console.log(underTest.state());
    const user = underTest.state().user;
    expect(user.role).toEqual('Patient');
    expect(user.birthDate).toEqual(new Date('1985-08-01'));
    expect(user.gender).toEqual('male');
    expect(user.name).toEqual('Jason Argonaut');
    expect(user.careProvider).toEqual('Physician Family Medicine');
    expect(user.language).toEqual('English');
    expect(user.phone).toHaveLength(4);
    expect(user.email).toEqual('open@epic.com');
});
