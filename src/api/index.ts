import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type User = {
  token: string;
  uid: string;
  name: string;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("x-token", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }: { email: string; password: string }) => ({
        url: `/auth`,
        method: "POST",
        body: { email, password },
      }),
    }),
    renewLogin: builder.query<User, undefined>({
      query: () => `/auth/renew`,
    }),
  }),
});

export const { useLoginMutation, useRenewLoginQuery } = api;
