export default (id) => { 
	return { 
		type: 'DELETE_POINT',
		payload: {id}
	}	
};