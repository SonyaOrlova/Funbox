import * as actions from '../../actions/index';
import reducer from '../../reducers/index';
import {DEFAULT_MAP_CENTER_COORDS} from '../../helpers/constants';

describe('REDUCERS - test', () => {

	const defaultState = {
		mapCenterCoords: DEFAULT_MAP_CENTER_COORDS, 
		points: [] 
	};

	it ('should return the default state', () => {
		const action = {}; // empty action

		expect(reducer(undefined, action)).toEqual(defaultState);
	});

	it ('should add points', () => {
		// add first point
		const point1 = {name: 'a', coords: DEFAULT_MAP_CENTER_COORDS};
		const uniqueId1 = 'id1';
		const action1 = {...actions.addPoint(point1), uniqueId: uniqueId1}; // simulates middleware

		const result1 = reducer(undefined, action1);

		expect(result1.points).toEqual([{...point1, id: uniqueId1}]);

		// add second point
		const point2 = {name: 'b', coords: DEFAULT_MAP_CENTER_COORDS};
		const uniqueId2 = 'id2';

		const action2 = {...actions.addPoint(point2), uniqueId: uniqueId2}; // simulates middleware
		const result2 = reducer(result1, action2);

		expect(result2.points).toEqual([...result1.points, {...point2, id: uniqueId2}]);
	});

	it ('should delete points', () => {
		const state = {
			mapCenterCoords: DEFAULT_MAP_CENTER_COORDS, 
			points: [{name: 'a', coords: DEFAULT_MAP_CENTER_COORDS, id: 'id1'}, {name: 'b', coords: DEFAULT_MAP_CENTER_COORDS, id: 'id2'}]
		};

		// delete first point
		const action1 = actions.deletePoint('id1');
		const result1 = reducer(state, action1);

		expect(result1.points).toEqual([{name: 'b', coords: DEFAULT_MAP_CENTER_COORDS, id: 'id2'}]);

		// delete second point
		const action2 = actions.deletePoint('id2');
		const result2 = reducer(result1, action2);

		expect(result2.points).toEqual([]);
	});

	it ('should reorder points', () => {
		const state = {
			mapCenterCoords: DEFAULT_MAP_CENTER_COORDS, 
			points: [{name: 'a', coords: DEFAULT_MAP_CENTER_COORDS, id: 'id1'}, {name: 'b', coords: DEFAULT_MAP_CENTER_COORDS, id: 'id2'}, {name: 'c', coords: DEFAULT_MAP_CENTER_COORDS, id: 'id3'}]
		};

		// swaps first and second points
		const oldPointIndex1 = 0;
		const newPointIndex1 = 1;

		const action1 = actions.reorderPoint(oldPointIndex1, newPointIndex1);
		const result1 = reducer(state, action1);

		expect(result1.points).toEqual([{name: 'b', coords: DEFAULT_MAP_CENTER_COORDS, id: 'id2'}, {name: 'a', coords: DEFAULT_MAP_CENTER_COORDS, id: 'id1'}, {name: 'c', coords: DEFAULT_MAP_CENTER_COORDS, id: 'id3'}]);

		// then swaps second and third points
		const oldPointIndex2 = 1;
		const newPointIndex2 = 2;

		const action2 = actions.reorderPoint(oldPointIndex2, newPointIndex2);
		const result2 = reducer(result1, action2);

		expect(result2.points).toEqual([{name: 'b', coords: DEFAULT_MAP_CENTER_COORDS, id: 'id2'}, {name: 'c', coords: DEFAULT_MAP_CENTER_COORDS, id: 'id3'}, {name: 'a', coords: DEFAULT_MAP_CENTER_COORDS, id: 'id1'}]);
	});

	it ('should update points coords', () => {
		const state = {
			mapCenterCoords: DEFAULT_MAP_CENTER_COORDS, 
			points: [{name: 'a', coords: DEFAULT_MAP_CENTER_COORDS, id: 'id1'}, {name: 'b', coords: DEFAULT_MAP_CENTER_COORDS, id: 'id2'}]
		};

		// update first point coords
		const updatedPointId1 = 'id1';
		const newPointCoords1 = [11.11, 22.22];

		const action1 = actions.updatePointCoords(updatedPointId1, newPointCoords1);
		const result1 = reducer(state, action1);

		expect(result1.points).toEqual([{name: 'a', coords: newPointCoords1, id: 'id1'}, {name: 'b', coords: DEFAULT_MAP_CENTER_COORDS, id: 'id2'}]);

		// update second point coords
		const updatedPointId2 = 'id2';
		const newPointCoords2 = [33.33, 44.44];
		
		const action2 = actions.updatePointCoords(updatedPointId2, newPointCoords2);
		const result2 = reducer(result1, action2);

		expect(result2.points).toEqual([{name: 'a', coords: newPointCoords1, id: 'id1'}, {name: 'b', coords: newPointCoords2, id: 'id2'}]);
	});

	it ('should set new map center coordinates', () => {
		const state = defaultState;
		const newCoords = [55.55, 66.66];

		const action = actions.setMapCenterCoords(newCoords);
		const result = reducer(state, action);

		expect(result.mapCenterCoords).toEqual(newCoords);
	});
});
