import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { userStore, userLogin } from "../api/authApi";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    isError: false,
    user: null,
    error: '',
};

//user register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await userStore(formData);
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue({ message: err.message });
      }
    }
  }
);

//user login
export const loginUser = createAsyncThunk(
    "auth/login",
    async (formData) => {
        const response = await userLogin(formData);
        return response.data;
    }
)




const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setUser: (state, action) => {}
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) =>{
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase(registerUser.rejected, (state, action) =>{
            state.isError = true;
            state.error = action.error?.message;
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(loginUser.pending, (state) =>{
            state.isError=false;
            state.isLoading= true;
        }).addCase(loginUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state. action.payload.status ? action.payload.user : null;
            state.isAuthenticated = action.payload.status;
        }).addCase(loginUser.rejected, (state, action) => {
            state.isError = true;
            state.error = action.error?.message;
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        });
    }
});
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
