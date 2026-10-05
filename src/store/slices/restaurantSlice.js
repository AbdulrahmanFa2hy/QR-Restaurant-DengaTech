import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, baseURL } from "../configAPI";
import { handleAsyncThunk } from "../../utils/handleAsyncThunk";
import Cookies from "js-cookie";
import { setThemeData } from "./themeSlice";

export const getOurRestaurantsData = createAsyncThunk(
  "restaurant/getOurRestaurantsData",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${baseURL}/restaurant`, { params });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getRestaurantByID = createAsyncThunk(
  "restaurant/getRestaurantByID",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${baseURL}/restaurant/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMyRestaurantData = createAsyncThunk(
  "restaurant/getMyRestaurantData",
  async (restaurantId, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.get(
        `${baseURL}/restaurant/allData/${restaurantId}`
      );

      // Dispatch theme data to theme slice if customMenu exists
      if (data?.data?.customMenu) {
        dispatch(setThemeData(data.data.customMenu));
      }

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
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
      state.complete = false;
    },
  },
  extraReducers: (builder) => {
    // Get Our Restaurants Data
    handleAsyncThunk(builder, getOurRestaurantsData, {
      onSuccess: (state, action) => {
        state.data = action.payload?.data || null;
      },
      onError: (state) => {
        state.data = null;
      },
    });

    // Get Restaurant by ID
    handleAsyncThunk(builder, getRestaurantByID, {
      onSuccess: (state, action) => {
        state.data = action.payload?.data || null;
        console.log(action.payload);
      },
      onError: (state) => {
        state.data = null;
      },
    });

    // Get My Restaurant Data
    handleAsyncThunk(builder, getMyRestaurantData, {
      onSuccess: (state, action) => {
        state.data = action.payload?.data || null;
      },
      onError: (state) => {
        state.data = null;
      },
    });
  },
});

export const { resetData } = restaurantSlice.actions;
export default restaurantSlice.reducer;
