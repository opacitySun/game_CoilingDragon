import React, { Component } from 'react';
import {Router,Route,Link,Switch} from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';
import CreateRole from '../components/createRole';
import NotFoundPage from '../components/notFoundPage';

import store from '../reducer/store';

// 引入路由
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          {/*路由配置*/}
          <Router history = {history}>
            <div>
              {/*编写导航*/}
              <Switch>
                <Route exact path="/" component={CreateRole}/>
                <Route path="*" component={NotFoundPage}/>
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
