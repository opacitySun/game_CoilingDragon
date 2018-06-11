const themeReducer = (state, action) => {
    if (!state) return {
      themeColor: 'red'
    }
    switch (action.type) {
      case 'CHANGE_COLOR':
      	// state.themeColor = action.themeColor;
        var newState = JSON.parse( JSON.stringify( state ) );
        newState.themeColor = action.themeColor;
        return newState;
      default:
        return state
    }
}
export default themeReducer