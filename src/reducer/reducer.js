import { combineReducers } from 'redux';
import roleAction from './roleAction';
import themeReducer from './themeReducer';
  
const reducer = combineReducers({
	// roleAction,
	themeReducer
});
  
export default reducer;