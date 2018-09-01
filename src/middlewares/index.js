import {applyMiddleware} from 'redux';
import newId from '../utils/newId';

const setPointId = store => next => action => {

	action.generateId ? 
	next({
		...action,
		uniqueId: newId()
	}) :
	next(action)
};

export default applyMiddleware(setPointId);