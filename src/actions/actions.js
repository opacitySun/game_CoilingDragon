import * as types from './actionTypes';
  
export function addItem(item) {
    return {
       type: types.ADD_ITEM,
       item
    }
}
export function deleteItem(item, e) {
    return {
       type: types.DELETE_ITEM,
       item
    }
}
export function deleteAll() {
    return {
       type: types.DELETE_ALL
    }
}
export function filterItem(e) {
    let filterItem = e.target.value;
    return {
       type: types.FILTER_ITEM,
       filterItem
    }
}
export function showItem(item) {
    return {
       type: types.SHOW_ITEM,
       item
    }
}
export function hideItem(item) {
    return {
       type: types.HIDE_ITEM,
       item
    }
}