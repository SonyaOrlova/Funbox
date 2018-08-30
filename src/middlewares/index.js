import {applyMiddleware} from 'redux';
import newId from '../utils/newId';

const setPointId = store => next => action => {
	action.generateId ? 
		next({
			...action,
			payload: {...action.payload, id: newId()}
		}) :
		next(action)
};

export default applyMiddleware(setPointId);