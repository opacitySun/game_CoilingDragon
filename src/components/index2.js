import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ThemeSwitch from './themeSwitch';

class Index2 extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div style={{background:'yellow'}}>
                <h2>首页</h2>
                <p>这是一个 react 学习的基本操作的小栗子</p>
                <p>通过本次学习可以清楚的掌握， react-router、redux的基本使用方法</p>
                <br/>
                <br/>
                <br/>
            </div>
            <ThemeSwitch />
        );
    }
}

export default Index2;