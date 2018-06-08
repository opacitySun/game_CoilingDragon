const themeReducer = (state, action) => {
    if (!state) return {
      themeColor: 'red'
    }
    switch (action.type) {
      case 'CHANGE_COLOR':
      	state.themeColor = action.themeColor;
        return state;
      default:
        return state
    }
}
export default themeReducer