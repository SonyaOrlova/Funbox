export default ({oldIndex, newIndex}) => { 
	return { 
		type: 'REORDER_POINT',
		payload: {oldIndex, newIndex}
	}	
};