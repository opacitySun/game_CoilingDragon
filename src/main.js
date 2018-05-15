import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,HashRouter,Route} from 'react-router-dom';
import App from './containers/app';
// import About from './About.jsx';
// import Home from './Home.jsx';

function Home(){
	return <h2>Home Page</h2>
}

function About(){
	return <h2>About Page</h2>
}

ReactDOM.render(
	<BrowserRouter>
		<div>
			<Route path='/' component={App} />
			<Route path='/about' component={About} />
			<Route path='/home' component={Home} />
		</div>
	</BrowserRouter>,
	document.getElementById('root')
);
// ReactDOM.render(<App />, document.getElementById('root'));