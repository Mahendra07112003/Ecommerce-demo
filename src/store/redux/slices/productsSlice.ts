import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import { Product } from "@/types/product";

interface ProductsState {
  items: Product[];
  current?: Product;
  status: "idle" | "loading" | "failed";
  error?: string;
}

const initialState: ProductsState = { items: [], status: "idle" };

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (params: { q?: string; category?: string; minPrice?: number; maxPrice?: number } | undefined) => {
    const res = await api.getProducts(params);
    // Map backend product shape to frontend Product if needed
    return res.products as Product[];
  }
);

export const fetchProductById = createAsyncThunk("products/fetchById", async (id: string) => {
  const res = await api.getProduct(id);
  return res.product as Product;
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "idle";
        state.current = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;

