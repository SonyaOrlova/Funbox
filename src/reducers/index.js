import {DEFAULT_MAP_CENTER_COORDS} from '../helpers/constants';
import {combineReducers} from 'redux';
import {arrayMove} from 'react-sortable-hoc';

console.log('hello');

const points = (state = [], action) => {
	const {type, payload, uniqueId} = action; // gets uniqueId from the middleware

	switch (type) {
		case 'ADD_POINT':
			const newPoint = {...payload, id: uniqueId};
			return [...state, newPoint]; 

		case 'DELETE_POINT':
			const deletedPointId = payload;
			return state.filter(point => point.id !== deletedPointId);

		case 'REORDER_POINT':
			const oldIndex = payload.oldIndex;
			const newIndex = payload.newIndex;
			return arrayMove([...state], oldIndex, newIndex);

		case 'UPDATE_POINT_COORDS':
			const updatedPointId = payload.id;
			const newCoords = payload.coords;
			return state.map(point => point.id === updatedPointId ? point = {...point, coords: newCoords} : point);

		default:
			return state;
	}
};

const mapCenterCoords = (state = DEFAULT_MAP_CENTER_COORDS, action) => {
	const {type, payload} = action;

	switch (type) {
		case 'SET_MAP_CENTER_COORDS':
			const coords = payload;
			return coords;

		default:
			return state;
	}
}

export default combineReducers({
	points,
	mapCenterCoords
});