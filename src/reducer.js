const themeReducer = (state, action) => {
    if (!state) return {
      themeColor: 'red'
    }
    switch (action.type) {
      case 'CHANGE_COLOR':
        return { Math.max.apply(null, state) , themeColor: action.themeColor }
      default:
        return state
    }
}
export default themeReducer