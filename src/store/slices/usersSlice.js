import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, baseURL } from "../configAPI";
import { handleAsyncThunk } from "../../utils/handleAsyncThunk";

export const getUsers = createAsyncThunk(
  "Users/getUsers",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${baseURL}/user`, { params });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  data: null,
  loading: false,
  error: null,
  complete: false,
  isAuthenticated: false,
};

const UsersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
      state.complete = false;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    // Get Users
    handleAsyncThunk(builder, getUsers, {
      onSuccess: (state, action) => {
        state.data = action.payload?.data || null;
        state.isAuthenticated = true;
      },
      onError: (state) => {
        state.data = null;
        state.isAuthenticated = false;
      },
    });
  },
});

export const { cleargetUsersError, cleardata } = UsersSlice.actions;
export default UsersSlice.reducer;
