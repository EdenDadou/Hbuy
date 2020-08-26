
import {
    GET_HORSE_LIST,
    GET_HORSE_LIST_SUCCESS,
    GET_HORSE_ITEM
} from '../actions';



export const getHorseList = () => ({
    type: GET_HORSE_LIST
});

export const getHorseListSuccess = (items) => ({
    type: GET_HORSE_LIST_SUCCESS,
    payload: items
});
export const getHorseItem = (item) => ({
    type: GET_HORSE_ITEM,
    payload: item
});

