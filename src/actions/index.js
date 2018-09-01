export const addPoint = (point) => {
	return {
		type: 'ADD_POINT',
		payload: point,
		generateId: true
	}
};

export const deletePoint = (id) => { 
	return { 
		type: 'DELETE_POINT',
		payload: id
	}	
};

export const reorderPoint = ({oldIndex, newIndex}) => { 
	return { 
		type: 'REORDER_POINT',
		payload: {oldIndex, newIndex}
	}	
};

export const updatePoint = (id, coords) => {
	return {
		type: 'UPDATE_POINT',
		payload: {id, coords}
	}
};

export const getMapCenterCoords = (coords) => {
	return {
		type: 'GET_MAP_CENTER_COORDS',
		payload: coords
	}
};
