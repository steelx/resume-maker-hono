import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserType} from "@server/src/types.ts";
import {authApi} from "@/lib/auth/authApi.ts";

interface AuthState {
  user: UserType | null;
  authenticated: boolean;
}

const initialState: AuthState = {
  authenticated: false,
  user: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.getProfile.matchFulfilled, (state, action) => {
      state.user = action.payload
      state.authenticated = typeof state.user.id !== "undefined"
    })
  }
})

