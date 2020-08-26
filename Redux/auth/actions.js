
import {
    AUTH_USER,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAIL,
    USER_LOGOUT
} from '../actions';



export const UserAuthentification = (email, password) => ({
    type: AUTH_USER,
    payload : {email : email, password: password}
});

export const UserAuthentificationSuccess = (id, name) => ({
    type: AUTH_USER_SUCCESS,
    payload: {idUser: id, userName: name}
});


export const UserAuthentificationFail = (item) => ({
    type: AUTH_USER_FAIL,
    payload: item
});

export const UserLogout = () => ({
    type: USER_LOGOUT,
});

