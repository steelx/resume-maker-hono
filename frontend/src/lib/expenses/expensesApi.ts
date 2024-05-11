import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import {serverApi} from "@/lib/api";
import {Expense} from "@/lib/expenses/types.ts";

export const expensesApi = createApi({
    reducerPath: "expensesApi",
    baseQuery: fakeBaseQuery(),
    endpoints: (build) => ({
        getExpenses: build.query({
            queryFn: async (arg) => {
                const res = await serverApi.expenses["all"].$get()
                if (!res.ok) {
                    throw new Error("Server Error");
                }

                const data = await res.json();
                return {data}
            }
        }),
        getTotalExpenses: build.query({
            queryFn: async (arg) => {
                const res = await serverApi.expenses["total"].$get()
                if (!res.ok) {
                    throw new Error("Server Error");
                }

                const data = await res.json();
                return {data: data.total}
            }
        }),
        postExpenses: build.mutation<Expense[], Expense>({
            queryFn: async (data): Promise<Expense[]> => {
                const res = await serverApi.expenses.$post({ json: data })
                if (!res.ok) {
                    throw new Error("Server Error");
                }
                const result = await res.json();
                return result
            }
        })
    })
});

export const { useGetExpensesQuery, useGetTotalExpensesQuery, usePostExpensesMutation } = expensesApi
