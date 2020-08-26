import {
    AUTH_USER,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAIL,
    USER_LOGOUT, AUTH_USER_AUTO
} from '../actions';

const INIT_STATE = {
    loading: 'false',
    idUser: 0,
    connected: 'false',
    email: '',
    password: '',
    userName : ''
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, loading: true, email: action.payload.email, password: action.payload.password, };
        case AUTH_USER_SUCCESS:
            return { ...state, loading: false, connected: true, idUser: action.payload.idUser, userName: action.payload.userName };
        case AUTH_USER_FAIL:
            return { ...state, loading: false, connected: false };
        case USER_LOGOUT:
            return { ...state, loading: false, connected: false };
        default:
            return state
    }

}

