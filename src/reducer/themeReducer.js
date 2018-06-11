const themeReducer = (state, action) => {
    if (!state) return {
      themeColor: 'red'
    }
    switch (action.type) {
      case 'CHANGE_COLOR':
        //复制原state，创建新的state并返回
        var newState = JSON.parse( JSON.stringify( state ) );
        newState.themeColor = action.themeColor;
        return newState;
      default:
        return state
    }
}
export default themeReducer