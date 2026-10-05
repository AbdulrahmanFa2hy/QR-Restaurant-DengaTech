import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { api, baseURL } from "../configAPI";
import { handleAsyncThunk } from "../../utils/handleAsyncThunk";

// Create Category
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async ({ name, restaurant }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`${baseURL}/category`, {
        name,
        restaurant,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Update Category
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ categoryId, name, restaurant }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`${baseURL}/category/${categoryId}`, {
        name,
        restaurant,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Get All Categories
export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${baseURL}/category/myCategory`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Get Category by ID
export const getCategoryById = createAsyncThunk(
  "category/getCategoryById",
  async (categoryId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${baseURL}/category/${categoryId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Delete Category
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      await api.delete(`${baseURL}/category/${categoryId}`);
      return categoryId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
  success: false,
  complete: false,
};

const categorySlice = createSlice({
  name: "category",
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
    // Create Category
    handleAsyncThunk(builder, createCategory, {
      onSuccess: (state, action) => {
        state.data.push(action.payload.data);
      },
    });

    // Update Category
    handleAsyncThunk(builder, updateCategory, {
      onSuccess: (state, action) => {
        const index = state.data.findIndex(
          (category) => category._id === action.payload.data._id
        );
        if (index !== -1) {
          state.data[index] = action.payload.data;
        }
      },
    });

    // Get All Categories
    handleAsyncThunk(builder, getAllCategories, {
      onSuccess: (state, action) => {
        console.log(current(state));
        state.data = action.payload.data;
      },
    });

    // Get Category by ID
    handleAsyncThunk(builder, getCategoryById, {
      onSuccess: () => {
        // Category data is returned but not stored in currentCategory
        // Components should handle this data directly
      },
    });

    // Delete Category
    handleAsyncThunk(builder, deleteCategory, {
      onSuccess: (state, action) => {
        state.data = state.data.filter(
          (category) => category._id !== action.payload
        );
      },
    });
  },
});

export const { resetData } = categorySlice.actions;

export default categorySlice.reducer;
