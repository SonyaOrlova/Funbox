import {combineReducers} from 'redux';
import {arrayMove} from 'react-sortable-hoc';

const points = (state = [], action) => {
	const {type, payload} = action;

	switch (type) {
		case 'ADD_POINT':
			const newPoint = payload;
			return [...state, newPoint]; // gets point id from middleware

		case 'DELETE_POINT':
			const deletedPointId = payload;
			return state.filter(point => point.id !== deletedPointId);

		case 'REORDER_POINT':
			const oldIndex = payload.oldIndex;
			const newIndex = payload.newIndex;
			return arrayMove(state, oldIndex, newIndex);

		case 'UPDATE_POINT':
			const updatedPointId = payload.id;
			const newCoords = payload.coords;
			return state.map(point => point.id === updatedPointId ? point = {...point, coords: newCoords} : point);

		default:
			return state;
	}
};

const mapCenterCoords = (state = [55.76, 37.64], action) => {
	const {type, payload} = action;

	switch (type) {
		case 'GET_MAP_CENTER_COORDS':
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