import React, { Component } from 'react'
import { connect } from 'react-redux';
import store from '../reducer/store.js';


class Detail extends Component {
    constructor(props) {
        super(props);
        // 根据路由 id 跟 store 做过滤
        let item = props.planlist.planlist.filter((data) => data.id == props.match.params.id)
        console.log(item)
        this.state = {
            plan: item[0]
        }
    }
    render() {
        return (
            <div style={{padding: '20px'}}>
                <h3>计划详情</h3>
                <p>id： {this.state.plan.id}</p>
                <p>标题： {this.state.plan.title}</p>
                <p>内容： {this.state.plan.content}</p>
            </div>

        )
    }
}


const mapStateToProps = function(store) {
  return {
    planlist: store.planlist
  };
};
// 连接 tore 和组件
export default connect(mapStateToProps)(Detail);