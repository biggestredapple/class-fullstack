import { all } from "redux-saga/effects";
import recipeSagas from './recipe';

function* rootSaga() {
  yield all([
    ...recipeSagas
  ])
};

export default rootSaga;