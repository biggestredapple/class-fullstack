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

function* getRecipesSagaRequest(
  action: PayloadAction<AppActionTypes.Recipe.GetRecipesRequestAction>
) {
  try {
    yield put(AppActions.loading.setLoading());

    const filterArray: string = action.payload.filterOption? `['${action.payload.filterOption}']`: '';

    const result: ResponseGenerator = yield call(async () => {
      return await makeAPIRequst(`recipes?pageNum=${action.payload.pageNum ?? 0}&perPage=${action.payload.perPage ?? 10}&searchOption=${action.payload.searchOption ?? ''}&filterOption=${filterArray}`, "GET", {}, false);
    });

    yield put(AppActions.loading.finishLoading());
    yield put(AppActions.recipe.getRecipeSuccess(result.data));

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
  yield takeLatest("recipe/getRecipesRequest", getRecipesSagaRequest);
})();
