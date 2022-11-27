import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  userId: 0,
  studentNumber: 0
}

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    login: (state, action) =>{
      state.accessToken = action.payload.token
      state.userId = action.payload.userId
      state.studentNumber = action.payload.studentNumber
    }
  }
})

export const { login } = authSlice.actions
export default authSlice.reducer
