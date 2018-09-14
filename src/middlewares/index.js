import {applyMiddleware} from 'redux';
import newId from '../helpers/newId';

export const setId = store => next => action => {

	action.generateId ? 
	next({
		type: action.type,
		payload: action.payload,
		uniqueId: newId()
	}) :
	next(action)
};

export default applyMiddleware(setId);