import React, { Component } from 'react';
import {logo} from '../containers/imgurl';

class NotFoundPage extends Component {
  render () {
    return (
      <div>
        <div className="notFoundPageLeft">
        	<img src={logo} />
        </div>
        <div className="notFoundPageRight">
        	<p>找不到页面</p>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;