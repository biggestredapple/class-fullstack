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

function* updateRecipeRequestSaga(
  action: PayloadAction<AppActionTypes.Recipe.UpdateRecipeRequestAction>
) {
  try {
    yield put(AppActions.loading.setLoading());

    const result: ResponseGenerator = yield call(async () => {
      return await makeAPIRequst(`recipes/${action.payload.recipeId}`, "PUT", { ...action.payload.recipe }, false);
    });

    yield put(AppActions.loading.finishLoading());
    yield put(AppActions.recipe.updateRecipeSuccess(result.data));

    if (action.payload.next) {
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
  yield takeLatest("recipe/updateRecipeRequest", updateRecipeRequestSaga);
})();
