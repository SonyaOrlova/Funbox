import middleware from '../../middlewares/index';

describe('MIDDLEWARES - test', () => {
	const create = () => {
		const store = {};
		const next = jest.fn()
		const invoke = (action) => middleware(store)(next)(action)

		return {store, next, invoke}
	}

	it ('should create unique ID', () => {

	});
});