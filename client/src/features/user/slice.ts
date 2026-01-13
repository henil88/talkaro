import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../auth/slice";

interface User {
  name: string;
  avatar: string;
}

interface State {
  isActivated: boolean;
  user: null | User;
}

const initialState: State = {
  user: null,
  isActivated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isActivated = action.payload.isActivated;
    },
    setIsActivated: (state, action) => {
      state.isActivated = action.payload.isActivated;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
