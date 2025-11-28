import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "./actions";

interface State {
  isActivated: boolean;
  user: unknown | null;
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
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isActivated = action.payload.isActivated;
      })
      .addCase(getUser.rejected, (state) => {
        state.user = null;
        state.isActivated = false;
      });
  },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
