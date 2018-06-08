import React, { Component } from 'react';
import {
  Router,
  Route,
  Link
} from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';
// import store from '../reducer/store';
import {favicon} from './imgurl';
import Index from '../components/index';
import Index2 from '../components/index2';

// import createStore from '../store'
import { createStore } from 'redux'
import themeReducer from '../reducer'
const store = createStore(themeReducer)

// 引入路由
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

class App extends Component {
  constructor(props) {
    super(props);
    let _this = this;
    _this.state = {
      themeColor : 'red'
    };
    _this.handleClick = function(event){
      _this.setState({themeColor: 'blue'});
    };
  }
  getChildContext () {
    return { store }
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
            <div className="App-header">
              <img src={favicon} className="App-logo" alt="logo" />
              <h2 className='App-title' onClick={this.handleClick}>Welcome to React</h2>
            </div>
            <div>
              {/*路由配置*/}
              <Router history = {history}>
                 <div className="contentBox">
                    {/*编写导航*/}
                    <ul className="nav">
                      <li><Link to="/">首页</Link></li>
                      <li><Link to="/index2">首页2</Link></li>
                    </ul>
                    {/*路由匹配*/}
                    <div className="content"> 
                      <Route exact path="/" component={Index}/>
                      <Route path="/index2" component={Index2}/>
                    </div>
                </div>
              </Router>
            </div>
        </div>
      </Provider>
    );
  }
}

App.childContextTypes = {
  store: PropTypes.object
};

export default App;
