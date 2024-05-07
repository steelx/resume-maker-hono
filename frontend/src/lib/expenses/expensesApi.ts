import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import {serverApi} from "@/lib/api";

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
        })
    })
});

export const { useGetExpensesQuery } = expensesApi
