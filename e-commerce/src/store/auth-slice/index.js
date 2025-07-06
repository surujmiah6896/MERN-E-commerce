import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
  userStore,
  userLogin,
  userLogout,
  userAuthCheck,
} from "../api/authApi";
import axios from "axios";

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
    async (formData, { rejectWithValue }) => {
        try{
            const response = await userLogin(formData);
            return response.data;
        }catch(err){
            if(err.response && err.response.data){
                return rejectWithValue(err.response.data);
            }else{
                return rejectWithValue({ message: err.message });
            }
        }
    }
);

//user logout
export const logoutUser = createAsyncThunk(
    "auth/logout",
    async ({rejectWithValue}) => {
        try{
            const response = await userLogout();
            return response.data;
        }catch(err){
            if(err.response && err.response.data){
                return rejectWithValue(err.response.data);
            }else{
                return rejectWithValue({ message: err.message });
            }
        }
    }
);

//user auth check
export const checkAuth = createAsyncThunk(
  "auth/checkauth",
  async (formData = null, { rejectWithValue }) => {
    const response = await axios.get(
      "http://localhost:5000/api/auth/check-auth",
      {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
    return response;
  }
);


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setUser: (state, action) => {}
    },
    extraReducers: (builder) => {
        builder
          .addCase(registerUser.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
          })
          .addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false;
            state.isError = false;
            state.user = null;
            state.isAuthenticated = false;
          })
          .addCase(registerUser.rejected, (state, action) => {
            state.isError = true;
            state.error = action.error?.message;
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
          })
          .addCase(loginUser.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.user = action?.payload?.status ? action.payload.user : null;
            state.isAuthenticated = action.payload.status;
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.isError = true;
            state.error = action.error?.message;
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
          })
          .addCase(checkAuth.pending, (state, action) => {
            console.log("checkauth pending", action);
            state.isLoading = true;
          })
          .addCase(checkAuth.fulfilled, (state, action)=>{
            console.log("authcheck action", action);
            state.isLoading = false;
            state.user= action?.payload?.status ? action?.payload?.status : null;
            state.isAuthenticated= action.payload.status;
          }).addCase(checkAuth.rejected, (state, action)=>{
            console.log("checkauth rejected",action);
            
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
          })
          .addCase(logoutUser.fulfilled, (state) => {
            state.isLoading = false,
            state.isError = false,
            state.user = null,
            state.isAuthenticated = false;
          });
    }
});
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
