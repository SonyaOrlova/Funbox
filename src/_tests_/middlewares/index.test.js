import {setId} from '../../middlewares/index';

describe('MIDDLEWARES - test', () => {

	const store = {dispatch: jest.fn()};

	const next = jest.fn((arg) => store.dispatch(arg));

	it ('should dispatch action', () => {
		const action = () => {
			return {
				type: 'No need for ID',
				payload: {}
			}
		};

		setId(store.dispatch)(next)(action());

		expect(store.dispatch).toHaveBeenCalledWith({type: 'No need for ID', payload: {}});
	});

	it ('should first create unique ID and then dispatch action, when there is a flag: generateID', () => {
		const action = () => {
			return {
				type: 'Need ID',
				payload: {},
				generateId: true
			}
		};

		setId(store.dispatch)(next)(action());

		expect(store.dispatch).toHaveBeenCalledWith({type: 'Need ID', payload: {}, uniqueId: 'id1'});
	});
});