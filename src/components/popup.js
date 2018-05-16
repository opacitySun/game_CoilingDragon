import React, { Component } from 'react'
import { connect } from 'react-redux';
import store from '../reducer/store';
import {showItem, addItem} from '../actions/actions';

class Pupop extends Component{
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      title: '1',
      content: '1'
    }
  }
  // 取消按钮操作
  close () {
    let b = this.props.planlist.show;
    this.setState({
      id: '',
      title: '',
      content: ''
    })
    store.dispatch(showItem(!b));
  }
  // 输入框事件
  handleChage (str, e) {
    this.setState({
      id: Math.ceil(Math.random()*10000),
      [str]: e.target.value
    })
  }
  // 确认操作
  conform () {
    store.dispatch(addItem(this.state));
    this.setState({
      id: '',
      title: '',
      content: ''
    })
    this.close();
  }

  render() {
    let self = this;
    return (
      <section className="popup" style={this.props.planlist.show ? {} : {display: 'none'}}>
        <div className="pbox">
          <span className="close" onClick={this.close.bind(this)}>X</span>
          <div>
            <h4>计划标题</h4>
            <input onChange={this.handleChage.bind(this, 'title')} value={this.state.title} placeholder="请输入计划标题"/>
          </div>
          <div>
            <h4>计划内容</h4>
            <textarea onChange={this.handleChage.bind(this, 'content')} value={this.state.content} placeholder="请输入计划内容" rows="3"></textarea>
          </div>
          <div className="pBtn">
            <span onClick = {this.close.bind(this)}>取消</span>
            <span onClick = {this.conform.bind(this)}>确认</span>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    planlist: store.planlist
  };
};
// 连接 store和组件
export default connect(mapStateToProps)(Pupop);