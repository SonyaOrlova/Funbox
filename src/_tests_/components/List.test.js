import React from 'react';
import {mount} from 'enzyme';

import {List} from '../../components/List';

jest.mock('react-sortable-hoc', () => ({
	SortableContainer: Component => props => <div className = 'container' onDragEnd = {props.onSortEnd}> <Component {...props} /> </div>,
	SortableElement: component => component
}));

describe('LIST - test', () => {
	const mockDeletePoint = jest.fn();
	const mockReorderPoint = jest.fn();

	const props = {
		points: [{name: 'a', coords: [], id: 'id1'}, {name: 'b', coords: [], id: 'id2'}],
		deletePoint: mockDeletePoint,
		reorderPoint: mockReorderPoint
	};

	const component = mount(<List {...props} />);

	it ('should call action for deleting point when clicked', () => {
		const button = component.find('button').first();

		button.simulate('click');

		expect(mockDeletePoint).toHaveBeenCalledWith('id1');
	});

	it ('should call action for reordering points when dragged', () => {
		const container = component.find('.container');

		container.simulate('dragend');

		expect(mockReorderPoint).toHaveBeenCalled();
	});
});