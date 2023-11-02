import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Event, Events, User } from "../types";

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
  tagTypes: ["Events"],
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
    getEvents: builder.query<Events, undefined>({
      query: () => "/events",
      providesTags: [{ type: "Events" }],
    }),
    postEvent: builder.mutation({
      query: (payload) => ({
        url: "/events",
        method: "POST",
        body: { ...payload },
      }),
      invalidatesTags: ["Events"],
    }),
    updateEvent: builder.mutation({
      query: (payload) => {
        const { id, ...body } = payload;
        return {
          url: `/events/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: [{ type: "Events" }],
    }),
    deleteEvent: builder.mutation({
      query: (id: string) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
      // invalidatesTags: (result, error, id) => [{ type: "Events", id }],
      invalidatesTags: [{ type: "Events" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRenewLoginQuery,
  useGetEventsQuery,
  usePostEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
} = api;
