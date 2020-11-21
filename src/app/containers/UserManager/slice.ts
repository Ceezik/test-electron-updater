import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./interfaces";
import { ContainerState } from "./types";

export const initialState: ContainerState = {
  loading: true,
  user: undefined,
};

const userManagerSlice = createSlice({
  name: "userManagerState",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | undefined>) {
      state.user = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = userManagerSlice;
