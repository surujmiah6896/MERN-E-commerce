import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { userStore } from "../api/authApi";
const initialState = {
    isAuthenticated: false,
    isLoading: true,
    isError: false,
    user: null,
    error: '',
};

export const registerUser = createAsyncThunk(
    'auth/register',
        async (formData) => {
        const response = await userStore(formData);
        return response.data;
    });


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
        .addCase(registerUser.fulfilled, (state, action) => {
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
        })
        ;
    }
});

export default authSlice.reducer;
