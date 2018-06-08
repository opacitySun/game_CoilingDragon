import React, { Component } from 'react'
import PropTypes from 'prop-types'

export const connect = (mapStateToProps,mapDispatchToProps) => (WrappedComponent) => {
  class Connect extends Component {
    constructor () {
      super()
      this.state = { allProps: {} }
    }

    componentWillMount () {
      const { store } = this.context
      this._updateProps()
      store.subscribe(() => this._updateProps())
    }

    _updateProps () {
      const { store } = this.context
      let stateProps = mapStateToProps
        ? mapStateToProps(store.getState(), this.props)
        : {} // 防止 mapStateToProps 没有传入
      let dispatchProps = mapDispatchToProps
        ? mapDispatchToProps(store.dispatch, this.props)
        : {} // 防止 mapDispatchToProps 没有传入
      this.setState({
        allProps: {
          ...stateProps,
          ...dispatchProps,
          ...this.props
        }
      })
    }

    render () {
      return <WrappedComponent {...this.state.allProps} />
    }
  }

  Connect.contextTypes = {
    store: PropTypes.object
  }

  return Connect
}


class Provider extends Component {
  getChildContext () {
    return {
      store: this.props.store
    }
  }

  render () {
    return (
      <div>{this.props.children}</div>
    )
  }
}

Provider.propTypes = {
  store: PropTypes.object,
  children: PropTypes.any
}

Provider.childContextTypes = {
  store: PropTypes.object
}

export Provider;