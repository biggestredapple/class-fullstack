import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./sagas";

import {
  loadingReducer,
  loadingActions,
  recipeReducer,
  recipeActions
} from './slices';

const reducer = combineReducers({
  loading: loadingReducer,
  recipe: recipeReducer
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  preloadedState: {},
  reducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({ serializableCheck: false, thunk: false }).concat(
      sagaMiddleware
    )
});

export const AppActions = {
  loading: loadingActions,
  recipe: recipeActions
};

sagaMiddleware.run(rootSaga);

export * as AppActionType from "./types";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;