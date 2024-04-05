import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CompilerSliceStateType } from "./compilerSlice";
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    credentials: "include",
  }),
  tagTypes: ["myCodes", "allcodes"],
  endpoints: (builder) => ({
    saveCode: builder.mutation<{ url: string; status: string }, codeType>({
      query: (code) => {
        return {
          url: "/compiler/save",
          method: "POST",
          body: code,
        };
      },
      invalidatesTags: ["myCodes", "allcodes"],
    }),
    loadCode: builder.mutation<
      { fullCode: CompilerSliceStateType["fullCode"]; isOwner: boolean },
      { urlId: string }
    >({
      query: (body) => ({
        url: "/compiler/load",
        method: "POST",
        body: body,
      }),
    }),
    login: builder.mutation<userInfoType, loginCredentialType>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: body,
        credentials: "include",
      }),
    }),
    signup: builder.mutation<userInfoType, signupCredentialType>({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body: body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    getUserDetails: builder.query<userInfoType, void>({
      query: () => "/auth/user-details",
    }),
    getMyCodes: builder.query<Array<codeType>, void>({
      query: () => "/auth/my-codes",
      providesTags: ["myCodes"],
    }),
    deleteCode: builder.mutation<void, string>({
      query: (_id) => ({
        url: `/compiler/delete/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["myCodes", "allcodes"],
    }),
    editCode: builder.mutation<
      void,
      { fullCode: CompilerSliceStateType["fullCode"]; id: string }
    >({
      query: ({ fullCode, id }) => ({
        url: `/compiler/edit/${id}`,
        method: "PUT",
        body: fullCode,
      }),
    }),
    getAllCodes: builder.query<
      Array<{ _id: string; title: string; ownerName: string }>,
      void
    >({
      query: () => ({
        url: "/compiler/get-all-codes",
        cache: "no-store",
      }),
      providesTags: ["allcodes"],
    }),
  }),
});

export const {
  useSaveCodeMutation,
  useLoadCodeMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserDetailsQuery,
  useSignupMutation,
  useGetMyCodesQuery,
  useDeleteCodeMutation,
  useEditCodeMutation,
  useGetAllCodesQuery,
} = api;
