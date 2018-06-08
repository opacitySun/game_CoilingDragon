const themeReducer = (state, action) => {
    if (!state) return {
      themeColor: 'red'
    }
    switch (action.type) {
      case 'CHANGE_COLOR':
      	var stateArr = [];
      	for(var i in state){
      		stateArr.push(state[i]);
      	}
        return { ...state, themeColor: action.themeColor }
      default:
        return state
    }
}
export default themeReducer