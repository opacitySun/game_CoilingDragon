import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ThemeSwitch extends Component {
	constructor () {
    super();
    this.state = { themeColor: '' };
  }
  componentWillMount () {
    this._updateThemeColor()
  }
  _updateThemeColor () {
    const { store } = this.context
    const state = store.getState()
    this.setState({ themeColor: state.themeColor })
  }
  // dispatch action 去改变颜色
  handleSwitchColor (color) {
    const { store } = this.context
    store.dispatch({
      type: 'CHANGE_COLOR',
      themeColor: color
    })
  }
  render () {
    return (
      <div>
        <button style={{ color: this.state.themeColor }} onClick={this.handleSwitchColor.bind(this, 'red')}>Red</button>
        <button style={{ color: this.state.themeColor }} onClick={this.handleSwitchColor.bind(this, 'blue')}>Blue</button>
      </div>
    )
  }
}

ThemeSwitch.contextTypes = {
	store: PropTypes.object
};

export default ThemeSwitch