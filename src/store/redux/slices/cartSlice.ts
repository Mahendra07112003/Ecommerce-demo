import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<{ product: Product; quantity?: number }>) {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((i) => i.productId === (product as any)._id || i.productId === product.id);
      const pid = (product as any)._id || product.id;
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ productId: pid, title: product.title, price: product.price, imageUrl: product.imageUrl, quantity });
      }
    },
    increase(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item) item.quantity += 1;
    },
    decrease(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.productId !== action.payload);
        }
      }
    },
    remove(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },
    clear(state) {
      state.items = [];
    },
  },
});

export const selectTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.quantity * i.price, 0);
  return { totalItems, totalPrice };
};

export const { addItem, increase, decrease, remove, clear } = cartSlice.actions;
export default cartSlice.reducer;

