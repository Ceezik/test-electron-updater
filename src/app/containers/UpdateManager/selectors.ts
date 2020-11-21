import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store/RootState";
import { initialState } from "./slice";

const selectDomain = (state: RootState) =>
  (state && state.updateManagerState) || initialState;

export const getUpdateManagerState = createSelector(
  [selectDomain],
  (updateManagerState) => updateManagerState
);
