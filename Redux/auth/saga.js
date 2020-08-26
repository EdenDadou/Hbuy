import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { UserLogin } from '../../Services/auth';

import {
  AUTH_USER
} from "../actions";

import {
  UserAuthentificationSuccess,
  UserAuthentificationFail
} from "./actions";



//-----------Connect User---------//

const ConnectUserAsync = async (UserEmail, UserPassword) => {
  return await UserLogin(UserEmail, UserPassword)
    .then(res => res)
    .catch(err => { console.log(err) })
}

function* Connexion({payload}) {
let UserEmail = payload.email
let UserPassword = payload.password
    try {
      const isConnected = yield call(ConnectUserAsync, UserEmail, UserPassword);
      if (isConnected.data !== "Error") {
        // console.log(isConnected)
        yield put(UserAuthentificationSuccess(isConnected.data[0].id, isConnected.data[0].name));
      } else {
        yield put(UserAuthentificationFail('Error'));
      }
    } catch (error) {
      yield put(UserAuthentificationFail('Error'));
    }
  }



export function* watchUserConnection() {
  yield takeEvery(AUTH_USER, Connexion);
}


export default function* rootSaga() {
  yield all([
    fork(watchUserConnection),
  ]);
}
