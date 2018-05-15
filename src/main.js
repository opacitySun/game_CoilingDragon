import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import App from './containers/app';

ReactDOM.render(Router, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));