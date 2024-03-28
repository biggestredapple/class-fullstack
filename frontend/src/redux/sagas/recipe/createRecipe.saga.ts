import { AppActions } from "../../store";

import { call, put } from "redux-saga/effects";

import { makeAPIRequst } from "utils";

import { takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import * as AppActionTypes from "../../types";
import { AxiosError } from "axios";

interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

function* createRecipeRequestSaga(
  action: PayloadAction<AppActionTypes.Recipe.CreateRecipeRequestAction>
) {
  try {
    yield put(AppActions.loading.setLoading());

    const result: ResponseGenerator = yield call(async () => {
      return await makeAPIRequst(`recipes`, "POST", { ...action.payload.recipe }, false);
    });

    console.log('action.payload: ', action.payload);
    yield put(AppActions.loading.finishLoading());
    yield put(AppActions.recipe.createRecipeSuccess(result.data));

    console.log('action.payload: ', action.payload);
    if (action.payload.next) {
      console.log('111111111');
      action.payload.next();
    }
  } catch (error: unknown) {
    yield put(AppActions.loading.finishLoading());

    if (error instanceof AxiosError) {
      const reasonCode: string = error.response?.data.reason;
      if (reasonCode && action.payload.errors) {
        const errorHandler: () => void = action.payload.errors[reasonCode];
        errorHandler();
      }
    }
  }
}

export default (function* () {
  yield takeLatest("recipe/createRecipeRequest", createRecipeRequestSaga);
})();
