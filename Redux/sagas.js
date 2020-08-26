import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import horseSagas from './horse/saga';


export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    horseSagas()
  ]);
}
