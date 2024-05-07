import { configureStore } from '@reduxjs/toolkit'
import {expensesApi} from "@/lib/expenses/expensesApi.ts";

export const store = configureStore({
    reducer: {
        [expensesApi.reducerPath]: expensesApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        expensesApi.middleware
    ),
    devTools: {
        name: "expenses-app-ui",
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
