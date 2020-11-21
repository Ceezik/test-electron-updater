import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ContainerState } from "./types";

export const initialState: ContainerState = {
  version: "0.0.0",
  status: "update.loading",
  loading: true,
};

const updateManagerSlice = createSlice({
  name: "updateManagerState",
  initialState,
  reducers: {
    setVersion(state, action: PayloadAction<string>) {
      state.version = action.payload;
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = updateManagerSlice;
