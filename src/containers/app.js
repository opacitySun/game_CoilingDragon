import React, { Component } from 'react';
import {
  Router,
  Route,
  Link
} from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import store from '../reducer/store';
import {favicon} from './imgurl';
import Index from '../components/index';
import Plan from '../components/plan';
import Popup from '../components/popup';
import TestRouter from '../components/testrouter';
import Detail from '../components/detail';

// 引入路由
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
            <div className="App-header">
              <img src={favicon} className="App-logo" alt="logo" />
              <h2 className='App-title'>Welcome to React Plan</h2>
            </div>
            <div>
              // 路由配置
              <Router history = {history}>
                 <div className="contentBox">
                    // 编写导航
                    <ul className="nav">
                      <li><Link to="/">首页</Link></li>
                      <li><Link to="/plan">计划表</Link></li>
                      <li><Link to="/test">二级路由</Link></li>
                    </ul>
                    // 路由匹配
                    <div className="content"> 
                      <Route exact path="/" component={Index}/>
                      <Route path="/plan" component={Plan}/>
                      <Route path="/test" component={TestRouter}/>
                      <Route path="/detail/:id" component={Detail}/>
                    </div>
                </div>
              </Router>
            </div>
            <Popup/>
        </div>
      </Provider>
    );
  }
}

export default App;
