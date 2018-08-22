import newId from '../utils/newId';

export default (point) => {
	return {
		type: 'ADD_POINT',
		payload: {...point, id: newId()}
	}
};