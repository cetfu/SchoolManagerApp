import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  userId: 0,
  studentNumber: 0,
  name: ""
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.token;
      state.userId = action.payload.userId;
      state.studentNumber = action.payload.studentNumber
      state.name = action.payload.name
    },
    logout: (state) =>{
      state.accessToken = ""
      state.userId = 0
      state.studentNumber = 0
      state.name = ""
    }
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
