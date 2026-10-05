import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, baseURL } from "../configAPI";
import { handleAsyncThunk } from "../../utils/handleAsyncThunk";

// Create Subcategory
export const createSubcategory = createAsyncThunk(
  "subcategory/createSubcategory",
  async ({ name, category, image }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      if (image) {
        formData.append("image", image);
      }

      const { data } = await api.post(`${baseURL}/subcategory`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Update Subcategory
export const updateSubcategory = createAsyncThunk(
  "subcategory/updateSubcategory",
  async ({ subcategoryId, name, category, image }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      if (image) {
        formData.append("image", image);
      }

      const { data } = await api.put(
        `${baseURL}/subcategory/${subcategoryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Get All My Subcategories
export const getAllMySubcategories = createAsyncThunk(
  "subcategory/getAllMySubcategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${baseURL}/subcategory/mySubcategory`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Get Subcategory by ID
export const getSubcategoryById = createAsyncThunk(
  "subcategory/getSubcategoryById",
  async (subcategoryId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${baseURL}/subcategory/${subcategoryId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Delete Subcategory
export const deleteSubcategory = createAsyncThunk(
  "subcategory/deleteSubcategory",
  async (subcategoryId, { rejectWithValue }) => {
    try {
      await api.delete(`${baseURL}/subcategory/${subcategoryId}`);
      return subcategoryId;
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

const subcategorySlice = createSlice({
  name: "subcategory",
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
      state.complete = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    // Create Subcategory
    handleAsyncThunk(builder, createSubcategory, {
      onSuccess: (state, action) => {
        console.log("Create subcategory response:", action.payload);
        // Handle different possible response structures
        const subcategoryData = action.payload.data || action.payload;
        if (subcategoryData) {
          state.data.push(subcategoryData);
        }
      },
    });

    // Update Subcategory
    handleAsyncThunk(builder, updateSubcategory, {
      onSuccess: (state, action) => {
        console.log("Update subcategory response:", action.payload);
        // Handle different possible response structures
        const subcategoryData = action.payload.data || action.payload;
        if (subcategoryData && subcategoryData._id) {
          const index = state.data.findIndex(
            (subcategory) => subcategory._id === subcategoryData._id
          );
          if (index !== -1) {
            state.data[index] = subcategoryData;
          }
        }
      },
    });

    // Get All My Subcategories
    handleAsyncThunk(builder, getAllMySubcategories, {
      onSuccess: (state, action) => {
        // Handle different possible response structures
        const subcategoriesData = action.payload.data || action.payload;
        if (Array.isArray(subcategoriesData)) {
          state.data = subcategoriesData;
        }
      },
    });

    // Get Subcategory by ID
    handleAsyncThunk(builder, getSubcategoryById, {
      onSuccess: () => {
        // Subcategory data is returned but not stored in currentSubcategory
        // Components should handle this data directly
      },
    });

    // Delete Subcategory
    handleAsyncThunk(builder, deleteSubcategory, {
      onSuccess: (state, action) => {
        state.data = state.data.filter(
          (subcategory) => subcategory._id !== action.payload
        );
      },
    });
  },
});

export const { clearError, clearSuccess } = subcategorySlice.actions;

export default subcategorySlice.reducer;
