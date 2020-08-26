import {
    CHANGE_LOCALE,
} from '../actions';



export const ChangeLocale = (item) => ({
    type: CHANGE_LOCALE,
    payload : item
});

