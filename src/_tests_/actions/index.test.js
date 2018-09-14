import * as actions from '../../actions/index';
import {DEFAULT_MAP_CENTER_COORDS} from '../../helpers/constants';

describe('ACTIONS - test',() => {

	const coords =  DEFAULT_MAP_CENTER_COORDS;
	const id = 'id1';

	it ('should create action for adding point', () => {
		const name = 'name1';
		const add = actions.addPoint({coords, name});
		
		expect(add).toEqual({ type:'ADD_POINT', payload: {coords, name: 'name1'}, generateId: true})
	});

	it ('should create action for deleting point', () => {
		const del = actions.deletePoint(id);
		
		expect(del).toEqual({ type:'DELETE_POINT', payload: id})
	});

	it ('should create action for reordering point', () => {
		const oldPointIndex = 1;
		const newPointIndex = 2;

		const reorder = actions.reorderPoint(oldPointIndex, newPointIndex);
		
		expect(reorder).toEqual({ type:'REORDER_POINT', payload: {oldIndex: oldPointIndex, newIndex: newPointIndex}})
	});

	it ('should create action for updating point coords', () => {
		const update = actions.updatePointCoords(id, coords);
		
		expect(update).toEqual({ type:'UPDATE_POINT_COORDS', payload: {id, coords}})
	});

	it ('should create action for setting map center coordinates', () => {
		const setCoords = actions.setMapCenterCoords(coords);
		
		expect(setCoords).toEqual({ type:'SET_MAP_CENTER_COORDS', payload: coords})
	});
});