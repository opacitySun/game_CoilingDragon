import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import configureStore from './configureStore'
import App from './containers/app';

// const store = configureStore();

ReactDOM.render(
	<App />,
	document.getElementById('root')
);