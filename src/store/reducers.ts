import { combineReducers } from "@reduxjs/toolkit";
import { InjectedReducersType } from "./injector-typings";

export function createReducer(injectedReducers: InjectedReducersType = {}) {
  if (Object.keys(injectedReducers).length === 0) {
    // @ts-ignore
    return (state) => state;
  }
  return combineReducers({
    ...injectedReducers,
  });
}
