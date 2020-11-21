import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../store/RootState";
import { initialState } from "./slice";

const selectDomain = (state: RootState) =>
  (state && state.userManagerState) || initialState;

export const getUserManagerState = createSelector(
  [selectDomain],
  (userManagerState) => userManagerState
);
