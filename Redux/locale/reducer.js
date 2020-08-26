import {
    CHANGE_LOCALE
} from '../actions';

const INIT_STATE = {
    Locale: 'en',
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CHANGE_LOCALE:
            return { ...state, Locale: action.payload };
        default:
            return state
    }

}

