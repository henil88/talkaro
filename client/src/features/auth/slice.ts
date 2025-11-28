import { createSlice } from "@reduxjs/toolkit";
import { verifyOTP } from "./actions";

interface State {
  token: string | null;
  isAuthorized: boolean;
}

const initialState: State = {
  token: null,
  isAuthorized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthorized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isAuthorized = action.payload.isAuthorized;
        state.token = action.payload.token;
      })
      .addCase(verifyOTP.rejected, (state) => {
        state.isAuthorized = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
