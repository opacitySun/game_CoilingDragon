import * as types from '../actions/actionTypes';

// const roleAction = (state, action) => {
//     if (!state) return {
//     	name:'',
//       sex:0
//     }
//     switch(action.type) {
//       case types.ADD_ROLE:
//       	var newState = JSON.parse( JSON.stringify( state ) );
//       	newState.name = action.name;
//         newState.sex = action.sex;
//         return newState;
//       default:
//         return state
//     }
// }

// export default roleAction

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