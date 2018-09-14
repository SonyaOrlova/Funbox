import React from 'react';
import {mount} from 'enzyme';

import {DEFAULT_MAP_CENTER_COORDS} from '../../helpers/constants';
import {Form} from '../../components/Form';

describe('FORM - test', () => {

	const mockAddPoint = jest.fn();

	const props = {
		mapCenterCoords: DEFAULT_MAP_CENTER_COORDS, 
		points: [{name: 'a', coords: [], id: ''}],
		addPoint: mockAddPoint
	};

	const component = mount(<Form {...props} />);

	const input = component.find('input');
	const form = component.find('form');

	it ('should update state on input change', () => {
		const name = 'b'; 

		input.simulate('change', {target: {value: name}});

		expect(component.state().pointName).toEqual(name);
	});

	it ('should call action for adding point when submitted', () => {
		const name = 'b'; 

		form.simulate('submit');

		expect(mockAddPoint).toHaveBeenCalledWith({name, coords: DEFAULT_MAP_CENTER_COORDS});
	});

	it ('should alert when point name is empty', () => {
		const name = ' ';
		window.alert = jest.fn();

		input.simulate('change', {target: {value: name}});
		form.simulate('submit');

		expect(window.alert).toHaveBeenCalledWith('Point name should not be empty');
	});

	it ('should alert when point name already exists', () => {
		const name = 'a'; 
		window.alert = jest.fn();

		input.simulate('change', {target: {value: name}});
		form.simulate('submit');

		expect(window.alert).toHaveBeenCalledWith('Point name already exists');
	});
});