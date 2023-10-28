import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constans";

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: "POST",
        body: data,
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
      }),
    }),

    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/edit`,
        method: "PUT",
        body: { ...data },
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogOutMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} = authSlice;
