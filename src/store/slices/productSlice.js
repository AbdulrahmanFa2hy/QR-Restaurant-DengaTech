import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, baseURL } from "../configAPI";
import { handleAsyncThunk } from "../../utils/handleAsyncThunk";

// Create Product
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (
    { name, price, subCategory, ingredients = [] },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.post(`${baseURL}/product`, {
        name,
        price,
        subCategory,
        ingredients,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Update Product
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (
    { productId, name, price, subCategory, ingredients = [] },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.put(`${baseURL}/product/${productId}`, {
        name,
        price,
        subCategory,
        ingredients,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Get All My Products
export const getAllMyProducts = createAsyncThunk(
  "product/getAllMyProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${baseURL}/product/myProduct`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Get Product by ID
export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${baseURL}/product/${productId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await api.delete(`${baseURL}/product/${productId}`);
      return productId;
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

const productSlice = createSlice({
  name: "product",
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
    // Create Product
    handleAsyncThunk(builder, createProduct, {
      onSuccess: (state, action) => {
        state.data.push(action.payload.data);
      },
    });

    // Update Product
    handleAsyncThunk(builder, updateProduct, {
      onSuccess: (state, action) => {
        const index = state.data.findIndex(
          (product) => product._id === action.payload.data._id
        );
        if (index !== -1) {
          state.data[index] = action.payload.data;
        }
      },
    });

    // Get All My Products
    handleAsyncThunk(builder, getAllMyProducts, {
      onSuccess: (state, action) => {
        state.data = action.payload.data;
      },
    });

    // Get Product by ID
    handleAsyncThunk(builder, getProductById, {
      onSuccess: () => {
        // Product data is returned but not stored in currentProduct
        // Components should handle this data directly
      },
    });

    // Delete Product
    handleAsyncThunk(builder, deleteProduct, {
      onSuccess: (state, action) => {
        state.data = state.data.filter(
          (product) => product._id !== action.payload
        );
      },
    });
  },
});

export const { clearError, clearSuccess } = productSlice.actions;

export default productSlice.reducer;
