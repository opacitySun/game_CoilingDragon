import React, { Component } from 'react';
import {logo} from '../containers/imgurl';

class NotFoundPage extends Component {
  render () {
    return (
      <div>
      	<div className="notFoundPage">
      		<div className="notFoundPageLeft">
	        	<img src={logo} />
	        </div>
	        <div className="notFoundPageRight">
	        	<p>404</p>
	        	<p>找不到页面</p>
	        </div>
      	</div>
      </div>
    );
  }
}

export default NotFoundPage;