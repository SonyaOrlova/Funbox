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

export const reorderPoint = (oldIndex, newIndex) => { 
	return { 
		type: 'REORDER_POINT',
		payload: {oldIndex, newIndex}
	}	
};

export const updatePointCoords = (id, coords) => {
	return {
		type: 'UPDATE_POINT_COORDS',
		payload: {id, coords}
	}
};

export const setMapCenterCoords = (coords) => {
	return {
		type: 'SET_MAP_CENTER_COORDS',
		payload: coords
	}
};
