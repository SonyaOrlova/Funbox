import React from 'react';
import {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import {DEFAULT_MAP_CENTER_COORDS} from '../../helpers/constants';
import App from '../../components/App';

describe('APP - test', () => {
	const defaultState = {
		mapCenterCoords: DEFAULT_MAP_CENTER_COORDS, 
		points: [] 
	};

	const store = configureStore()(defaultState);

	it ('renders without crashing', () => {
		mount(<Provider store = {store}><App  /></Provider>)
	});
});