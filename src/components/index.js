import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ThemeSwitch from './themeSwitch';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = { themeColor: '' };
    }
    componentWillMount () {
        const { store } = this.context;
        this._updateThemeColor();
        store.subscribe(() => this._updateThemeColor());
    }
    _updateThemeColor () {
        const { store } = this.context
        const state = store.getState()
        this.setState({ themeColor: state.themeColor })
    }
    render () {
        return (
            <div style={{background:this.state.themeColor}}>
                <h2>首页</h2>
                <p>这是一个 react 学习的基本操作的小栗子</p>
                <p>通过本次学习可以清楚的掌握， react-router、redux的基本使用方法</p>
                <br/>
                <br/>
                <br/>
                <ThemeSwitch />
            </div>
        );
    }
}

Index.contextTypes = {
    store: PropTypes.object
};

export default Index;