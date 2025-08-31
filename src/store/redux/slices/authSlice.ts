import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/lib/api";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
}

interface AuthState {
  user: AuthUser | null;
  status: "idle" | "loading" | "failed";
  error?: string;
}

const initialState: AuthState = { user: null, status: "idle" };

export const login = createAsyncThunk("auth/login", async (payload: { email: string; password: string }) => {
  const res = await api.login(payload);
  return res.user as AuthUser;
});

export const register = createAsyncThunk(
  "auth/register",
  async (payload: { name: string; email: string; password: string; role?: "admin" | "customer" }) => {
    const res = await api.register(payload);
    return res.user as AuthUser;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await api.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

