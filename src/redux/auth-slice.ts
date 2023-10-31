import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

type AuthState = {
  status: "checking" | "not-auth" | "authenticated";
  user: string | null;
  uid: string | null;
};

const initialState = {
  status: "not-auth",
  user: null,
  uid: null,
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (
      state,
      { payload: { uid, name } }: { payload: { uid: string; name: string } }
    ) => {
      state.status = "authenticated";
      state.uid = uid;
      state.user = name;
    },
    logout: (state) => {
      state.status = "not-auth";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.status = "authenticated";
        state.uid = payload.uid;
        state.user = payload.name;
      }
    ),
      builder.addMatcher(api.endpoints.login.matchRejected, (state) => {
        state.status = "not-auth";
        state.uid = null;
        state.user = null;
      }),
      builder.addMatcher(
        api.endpoints.renewLogin.matchFulfilled,
        (state, { payload }) => {
          state.status = "authenticated";
          state.uid = payload.uid;
          state.user = payload.name;
        }
      );
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
