import * as types from '../actions/actionTypes';

const roleAction = (state, action) => {
    if (!state) return {
    	name:'',
      sex:0
    }
    switch(action.type) {
      case types.ADD_ROLE:
      	var newState = JSON.parse( JSON.stringify( state ) );
      	newState.name = action.name;
        newState.sex = action.sex;
        return newState;
      default:
        return state
    }
}

export default roleAction