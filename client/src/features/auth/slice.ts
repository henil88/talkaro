import { createSlice } from "@reduxjs/toolkit";
import type { Identifier } from "@/types/credentials";

interface State {
  token: string | null;
  isAuthorized: boolean;
  credentials: Identifier | null;
}

const initialState: State = {
  token: null,
  isAuthorized: false,
  credentials: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.isAuthorized = action.payload.isAuthorized;
    },
    setCredentials: (state, action) => {
      state.credentials = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthorized = false;
      state.credentials = null;
    },
  },
});

export const { setToken, logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
