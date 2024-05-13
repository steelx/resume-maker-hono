import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import {serverApi} from "@/lib/api";
import {Expense} from "./types";

export const expensesApi = createApi({
  reducerPath: "expensesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["expenses", "totalExpenses"],
  endpoints: (build) => ({
    getExpenses: build.query({
      queryFn: async (arg) => {
        const res = await serverApi.expenses["all"].$get()
        if (!res.ok) {
          throw new Error("Server Error");
        }

        const data = await res.json();
        return {data}
      },
      providesTags: ["expenses"]
    }),
    getTotalExpenses: build.query({
      queryFn: async (arg) => {
        const res = await serverApi.expenses["total"].$get()
        if (!res.ok) {
          throw new Error("Server Error");
        }

        const data = await res.json();
        return {data: data.total}
      },
      providesTags: ["totalExpenses"]
    }),
    postExpenses: build.mutation<Expense, Expense>({
      queryFn: async (data) => {
        const res = await serverApi.expenses.$post({json: data})
        if (!res.ok) {
          throw new Error("Server Error");
        }
        const result = await res.json();
        return {
          data: result as unknown as Expense
        }
      },
      invalidatesTags: ["totalExpenses", "expenses"]
    })
  })
});

export const {useGetExpensesQuery, useGetTotalExpensesQuery, usePostExpensesMutation} = expensesApi
