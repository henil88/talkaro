import { createSlice } from "@reduxjs/toolkit";

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
      state.user = action.payload.user;
      state.isActivated = action.payload.isActivated;
    },
    setIsActivated: (state, action) => {
      state.isActivated = action.payload.isActivated;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { logout, setUser,  } = userSlice.actions;
export default userSlice.reducer;
