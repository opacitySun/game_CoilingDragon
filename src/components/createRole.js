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
      <div className="createRole">
        <div className="left">
          <h2>创建角色</h2>
          <div className="roleImg">
            <div className="roleCanvas"></div>
          </div>
          <div className="createRoleBtn">
            <button>确定</button>
            <button>重置</button>
          </div>
        </div>
        <div className="right">
          <section>
            <label>姓名：</label>
            <input type="text" />
          </section>
          <section>
            <label>性别：</label>
            <div className="sexRadio">
              <input type="radio" name="sex" value="0" checked="checked" />
              <span>男</span>
            </div>
            <div className="sexRadio">
              <input type="radio" name="sex" value="1" />
              <span>女</span>
            </div>
            <div className="sexRadio">
              <input type="radio" name="sex" value="2" />
              <span>未知</span>
            </div>
          </section>
          <section>
            <label>属性：</label>
            <div className="propGroup">
              <div className="propName">力量</div>
              <div className="propVal"></div>
            </div>
          </section>
        </div>
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