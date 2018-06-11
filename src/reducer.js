const themeReducer = (state, action) => {
    if (!state) return {
      themeColor: 'red'
    }
    switch (action.type) {
      case 'CHANGE_COLOR':
      	// state.themeColor = action.themeColor;
        return action.themeColor;
      default:
        return state
    }
}
export default themeReducer