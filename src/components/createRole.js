import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
require('jquery');

class CreateRole extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div style={{background:this.props.sex}}>
        <h2>首页</h2>
        <p>这是一个 react 学习的基本操作的小栗子</p>
        <p>通过本次学习可以清楚的掌握， react-router、redux的基本使用方法</p>
        <br/>
        <br/>
        <br/>
      </div>
    );
  }
}

CreateRole.contextTypes = {
  sex: PropTypes.number
};

const mapStateToProps = (state) => {
  return {
    sex: state.roleAction.sex
  }
};

CreateRole = connect(mapStateToProps)(CreateRole);

window.onload = function(){
  $("#root").show();
  $("#startLoadPageImg").hide();
}

export default CreateRole;