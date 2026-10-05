import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, baseURL } from "../configAPI";
import { handleAsyncThunk } from "../../utils/handleAsyncThunk";

export const createRestaurantAndOwner = createAsyncThunk(
  "restaurantAndOwner/createRestaurantAndOwner",
  async (restaurantData, { rejectWithValue, getState }) => {
    try {
      // Check if user is moderator
      const state = getState();
      const user = state.getMe?.data;

      if (!user || user.role !== "moderator") {
        return rejectWithValue("🚷 صلاحيات مرفوضة! غير مسموح له بالوصول");
      }

      const { data } = await api.post(`${baseURL}/restaurant`, restaurantData);
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
  success: false,
  complete: false,
};

const restaurantAndOwnerSlice = createSlice({
  name: "restaurantAndOwner",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
      state.complete = false;
    },
    clearRestaurantOwnerError(state) {
      state.error = null;
    },

    resetSuccess(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Create Restaurant and Owner
    handleAsyncThunk(builder, createRestaurantAndOwner, {
      onSuccess: (state, action) => {
        state.data = action.payload?.data || null;
        state.success = true;
      },
      onError: (state) => {
        state.data = null;
        state.success = false;
      },
    });
  },
});

export const {
  clearRestaurantOwnerError,
  clearRestaurantOwnerData,
  resetSuccess,
} = restaurantAndOwnerSlice.actions;

export default restaurantAndOwnerSlice.reducer;
