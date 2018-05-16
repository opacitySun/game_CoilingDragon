import React, { Component } from 'react'

class Detail extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{padding: '20px'}}>
                <h3>计划详情</h3>
                <p>id： 123</p>
                <p>标题： 测试标题</p>
                <p>内容： 测试内容</p>
            </div>

        )
    }
}
export default Detail