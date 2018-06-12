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
        <div className="">创建角色</div>
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
  $("#startLoadPage").hide();
}

export default CreateRole;