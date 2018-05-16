import * as types from '../actions/actionTypes';
import data from '../data/db';
  
const initialItems = {
    show: false, // 是否显示弹出
    planlist: data // 初始的计划表
};
  
export default function items(state = initialItems, action) {
    let list = state.planlist;
    switch(action.type) {
        case types.ADD_ITEM:
            list.push(action.item);
            return Object.assign({}, state, { planlist: list });
        case types.DELETE_ITEM: 
            let newstate = list.filter((item) => item.id != action.id);
            return Object.assign({}, state, { planlist: newstate });
        case types.SHOW_ITEM:
            return Object.assign({}, state, { show: action.show });
        case types.DELETE_ALL:
            return state.clear();
        default:
            return state;
    }
}