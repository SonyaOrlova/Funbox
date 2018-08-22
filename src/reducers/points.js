import {arrayMove} from 'react-sortable-hoc';

export default (state = [], action) => {
	const {type, payload} = action;

	switch (type) {
		case 'ADD_POINT':
			const newPoint = payload;
			return [...state, newPoint];

		case 'DELETE_POINT':
			const id = payload.id;
			return state.filter(point => point.id !== id);

		case 'REORDER_POINT':
			const oldIndex = payload.oldIndex;
			const newIndex = payload.newIndex;
			return arrayMove(state, oldIndex, newIndex);

		default:
			return state;
	}
};