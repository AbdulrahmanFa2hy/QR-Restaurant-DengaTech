import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, baseURL } from "../configAPI";
import { handleAsyncThunk } from "../../utils/handleAsyncThunk";

// Get all packages
export const getAllPackages = createAsyncThunk(
  "package/getAllPackages",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${baseURL}/package`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Get package by ID
export const getPackageById = createAsyncThunk(
  "package/getPackageById",
  async (packageId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${baseURL}/package/${packageId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Add new package
export const addPackage = createAsyncThunk(
  "package/addPackage",
  async (packageData, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`${baseURL}/package`, packageData);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Update package
export const updatePackage = createAsyncThunk(
  "package/updatePackage",
  async ({ packageId, packageData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `${baseURL}/package/${packageId}`,
        packageData
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Delete package
export const deletePackage = createAsyncThunk(
  "package/deletePackage",
  async (packageId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`${baseURL}/package/${packageId}`);
      return { packageId, data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
  complete: false,
  currentPackage: null,
};

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
      state.complete = false;
    },
    clearPackageError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get all packages
    handleAsyncThunk(builder, getAllPackages, {
      onSuccess: (state, action) => {
        state.data = action.payload?.data || [];
      },
    });

    // Get package by ID
    handleAsyncThunk(builder, getPackageById, {
      onSuccess: (state, action) => {
        state.currentPackage = action.payload?.data || null;
      },
    });

    // Add package
    handleAsyncThunk(builder, addPackage, {
      onSuccess: (state, action) => {
        if (action.payload?.data) {
          state.data.push(action.payload.data);
        }
      },
    });

    // Update package
    handleAsyncThunk(builder, updatePackage, {
      onSuccess: (state, action) => {
        if (action.payload?.data) {
          const index = state.data.findIndex(
            (pkg) => pkg._id === action.payload.data._id
          );
          if (index !== -1) {
            state.data[index] = action.payload.data;
          }
          if (state.currentPackage?._id === action.payload.data._id) {
            state.currentPackage = action.payload.data;
          }
        }
      },
    });

    // Delete package
    handleAsyncThunk(builder, deletePackage, {
      onSuccess: (state, action) => {
        state.data = state.data.filter(
          (pkg) => pkg._id !== action.payload.packageId
        );
        if (state.currentPackage?._id === action.payload.packageId) {
          state.currentPackage = null;
        }
      },
    });
  },
});

export const { clearPackageError, clearCurrentPackage, clearPackages } =
  packageSlice.actions;
export default packageSlice.reducer;
