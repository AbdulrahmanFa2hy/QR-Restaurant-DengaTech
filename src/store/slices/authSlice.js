import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { authAPI, tokenCookieKey } from "../configAPI";
import { handleAsyncThunk } from "../../utils/handleAsyncThunk";
import Cookies from "js-cookie";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Create a special axios instance for login that includes credentials
      // This ensures httpOnly refresh token is set by the server
      const loginInstance = axios.create({
        baseURL: authAPI.defaults.baseURL,
        withCredentials: true, // This allows httpOnly cookies to be received
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { data } = await loginInstance.post("/auth/login", {
        email,
        password,
      });

      if (data?.token) {
        Cookies.set(tokenCookieKey, data.token);
      }
      // Note: refresh token is httpOnly and will be set automatically by the server

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Logout thunk that properly clears httpOnly refresh token
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      // Create a special axios instance for logout that includes credentials
      // This ensures httpOnly refresh token is cleared by the server
      const logoutInstance = axios.create({
        baseURL: authAPI.defaults.baseURL,
        withCredentials: true, // This allows httpOnly cookies to be cleared
        headers: {
          "Content-Type": "application/json",
        },
      });

      await logoutInstance.post("/auth/logout");
      return true;
    } catch (error) {
      // Even if logout fails on server, we should still clear local state
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  data: null,
  loading: false,
  error: null,
  complete: false,
  token: typeof window !== "undefined" ? Cookies.get(tokenCookieKey) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = null;
      state.token = null;
      state.error = null;
      state.complete = false;
    },
    logout(state) {
      state.data = null;
      state.token = null;
      state.error = null;
      Cookies.remove(tokenCookieKey);
      // Note: refresh token is httpOnly, so it will be cleared by the server
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login User
    handleAsyncThunk(builder, loginUser, {
      onSuccess: (state, action) => {
        state.data = action.payload?.user || null;
        state.token = action.payload?.token || null;
      },
    });

    // Logout User
    handleAsyncThunk(builder, logoutUser, {
      onSuccess: (state) => {
        state.data = null;
        state.token = null;
        state.error = null;
        Cookies.remove(tokenCookieKey);
      },
      onError: (state) => {
        // Even if server logout fails, clear local state
        state.data = null;
        state.token = null;
        state.error = null;
        Cookies.remove(tokenCookieKey);
      },
    });
  },
});

export const { logout, clearError, resetData } = authSlice.actions;
export default authSlice.reducer;
