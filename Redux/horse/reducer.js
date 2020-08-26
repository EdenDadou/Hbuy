import {
    GET_HORSE_LIST,
    GET_HORSE_LIST_SUCCESS,
    GET_HORSE_ITEM
} from '../actions';

const INIT_STATE = {
    HorseList: {},
    HorseItem: {},
    loading: false
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_HORSE_LIST:
            return { ...state, loading: true };
        case GET_HORSE_LIST_SUCCESS:
            return { ...state, loading: false, HorseList: action.payload };
        case GET_HORSE_ITEM:
            return { ...state, HorseItem: action.payload };
        default:
            return state
    }

}

