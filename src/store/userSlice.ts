import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  email: null,
  fullName: null,
};

const userSlice = createSlice({
  name: "userConfig",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    logoutUser: () => initialState, // ✅ IMPORTANT
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
