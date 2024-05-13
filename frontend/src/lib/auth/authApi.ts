import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import {serverApi} from "@/lib/api";
import {UserType} from "@server/src/shared-types";


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    getProfile: build.query<UserType, {}>({
      queryFn: async (arg) => {
        const res = await serverApi.me.$get()
        if (!res.ok) {
          throw new Error("Server Error");
        }

        const data = await res.json();
        return {data: data.user}
      }
    }),
  })
});

export const {useGetProfileQuery} = authApi
