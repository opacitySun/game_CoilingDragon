src/component/plant.js
import React, { Component } from 'react'
import { connect } from 'react-redux';
import store from '../reducer/store';
// 引入 定义的 action
import {showItem, deleteItem} from '../actions/actions';

class Plan extends Component {
  constructor(props) {
      super(props);
  }
  // 显示弹出
  show () {
    let b = this.props.planlist.show;
    store.dispatch(showItem(!b));
  }
  // 删除计划
  delete (id) {
      store.dispatch(deleteItem(id));
  }
  // js 跳转路由
  detail (id) {
      this.props.history.push(`/detail/${id}`)
  }
    render () {
        return (
            <div>
                <div className="plant">
                    <h3>计划表</h3>
                    <p onClick={this.show.bind(this)}>添加计划</p>
                </div>
                <table className="planlist">
                    <thead>
                        <tr>
                            <th>标题</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.planlist.planlist.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="plan-title" onClick={this.detail.bind(this, item.id)}>{item.title}</td>
                                        <td className="plan-delect" onClick={this.delete.bind(this, item.id)}>删除</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
  return {
    planlist: store.planlist
  };
};
// 连接 store，作为 props
export default connect(mapStateToProps)(Plan);