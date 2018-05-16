import React, { Component } from 'react'

class Plan extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div>
                <div className="plant">
                    <h3>计划表</h3>
                    <p>添加计划</p>
                </div>
                <table className="planlist">
                    <thead>
                        <tr>
                            <th>标题</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="plan-title">计划1</td>
                            <td className="plan-delect">删除</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Plan;