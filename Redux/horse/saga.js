import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getHorse } from '../../Services/horses';

import {
  GET_HORSE_LIST
} from "../actions";

import {
  getHorseListSuccess
} from "./actions";



//-----------Get Horse list---------//

const GetHorseListAsync = async () => {
  return await getHorse()
    .then(res => res)
    .catch(err => { console.log(err) })
}

function* GetHORSE() {

    try {
      const horseList = yield call(GetHorseListAsync);

      if (horseList !== "Error") {
        yield put(getHorseListSuccess(horseList.data));
      } else {
        yield put(getHorseListSuccess('Error'));
      }
    } catch (error) {
      yield put(getHorseListSuccess('Error'));
      console.log(error)
    }
  }






export function* watchGetList() {
  yield takeEvery(GET_HORSE_LIST, GetHORSE);
}


export default function* rootSaga() {
  yield all([
    fork(watchGetList),
  ]);
}
