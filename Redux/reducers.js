import { combineReducers } from 'redux';
import auth from './auth/reducer';
import locale from './locale/reducer';
import horse from './horse/reducer';



const reducers = combineReducers({
  auth,
  locale,
  horse
});

export default reducers;