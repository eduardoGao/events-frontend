import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Event, Events, User } from "../types";

type Assistance = {
  id: string;
  assistance: string;
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
  tagTypes: ["Events", "EventsByUser", "EventsSubscriptions"],
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
      keepUnusedDataFor: 60 * 4,
      providesTags: [{ type: "Events" }],
    }),
    getEventsByUser: builder.query<Events, undefined>({
      query: () => "/events/by-user",
      keepUnusedDataFor: 60 * 4,
      providesTags: [{ type: "EventsByUser" }],
    }),
    getEventsSubscriptions: builder.query<Events, undefined>({
      query: () => "/events/subscriptions",
      keepUnusedDataFor: 60 * 4,
      providesTags: [{ type: "EventsSubscriptions" }],
    }),
    postEvent: builder.mutation({
      query: (payload) => ({
        url: "/events",
        method: "POST",
        body: { ...payload },
      }),
      invalidatesTags: ["Events", "EventsByUser"],
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
      invalidatesTags: [{ type: "EventsByUser" }],
    }),
    deleteEvent: builder.mutation({
      query: (id: string) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "EventsByUser" }, { type: "Events" }],
    }),
    addAttendance: builder.mutation({
      query: (payload: { id: string; assistant: string }) => {
        const { id, assistant } = payload;

        return {
          url: `/events/${id}/add-assistant`,
          method: "PATCH",
          body: { assistant },
        };
      },
      invalidatesTags: [{ type: "Events" }],
    }),
    removeAttendance: builder.mutation({
      query: (payload: { id: string; assistant: string }) => {
        const { id, assistant } = payload;

        return {
          url: `/events/${id}/remove-assistant`,
          method: "PATCH",
          body: { assistant },
        };
      },
      invalidatesTags: [{ type: "Events" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRenewLoginQuery,
  useGetEventsQuery,
  useGetEventsSubscriptionsQuery,
  usePostEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
  useGetEventsByUserQuery,
  useAddAttendanceMutation,
  useRemoveAttendanceMutation,
} = api;
