import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAPI, tokenCookieKey } from "../configAPI";
import { handleAsyncThunk } from "../../utils/handleAsyncThunk";
import Cookies from "js-cookie";

export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get(tokenCookieKey);
      if (!token) {
        return rejectWithValue("No token found");
      }

      const { data } = await authAPI.get("/auth/getMe");
      return data;
    } catch (error) {
      // If token is invalid, remove it from cookies
      Cookies.remove(tokenCookieKey);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: false,
  complete: false,
  isAuthenticated: false,
};

const getMeSlice = createSlice({
  name: "getMe",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
      state.complete = false;
    },
    clearGetMeError(state) {
      state.error = null;
    },
    clearUser(state) {
      state.data = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    // Get Me
    handleAsyncThunk(builder, getMe, {
      onSuccess: (state, action) => {
        state.data = action.payload?.user || null;
        state.isAuthenticated = true;
      },
      onError: (state, action) => {
        state.data = null;
        state.isAuthenticated = false;
      },
    });
  },
});

export const { resetData, clearGetMeError, clearUser } = getMeSlice.actions;
export default getMeSlice.reducer;
