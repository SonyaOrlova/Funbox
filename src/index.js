import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import middleware from './middlewares/index'
import reducer from './reducers/index';
import {Provider} from 'react-redux';
import App from './components/App';

const store = createStore(reducer, {}, middleware);

//dev only
window.store = store;

ReactDOM.render(
	<Provider store = {store}> 
		<App /> 
	</Provider>, 
	document.getElementById('root')
);

