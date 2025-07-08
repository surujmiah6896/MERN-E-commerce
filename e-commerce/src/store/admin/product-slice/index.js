
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addProduct, getProducts, productDelete, productEdit } from "../../api/productApi";


const initialState = {
  isLoading: false,
  error: "",
  products: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData, {rejectWithValue}) => {
      try {
        const response = await addProduct(formData);
        return response?.data;
      } catch (err) {
        if (err.response && err.response.data) {
          return rejectWithValue(err.response.data);
        } else {
          return rejectWithValue({ message: err.message });
        }
      }
    }
);

export const editProduct = createAsyncThunk(
  "product/edit",
  async ({ id, data },  { rejectWithValue }) => {
    try {
      const response = await productEdit(id, data);
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue({ message: err.message });
      }
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "/product/getAllProducts",
  async (formData = null, { rejectWithValue }) => {
    try {
      const response = await getProducts();
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue({ message: err.message });
      }
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await productDelete(id);
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue({ message: err.message });
      }
    }
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.products = action?.payload?.status ? action?.payload?.data : null;
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.error?.message;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.products = action?.payload?.status ? action?.payload?.data : null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.error?.message;
      })
      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.products = action?.payload?.status ? action?.payload?.data : null;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.error?.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const { status, data } = action.payload || {};
        if (status && data) {
          state.products = state.products.filter((p) => p._id !== data._id);
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.error?.message;
      });
  },
});


export default AdminProductsSlice.reducer;