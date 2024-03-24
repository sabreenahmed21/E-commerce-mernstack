
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_URL}/api/` }),
  endpoints: (builder) => ({
    getproductByName: builder.query({
      query: (name) => `${name}`,
    }),
    signIn: builder.mutation({
      query: (formData) => ({
        url: "/login",
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    signUp: builder.mutation({
      query: (formData) => ({
        url: "/signup",
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    verifyCodePassword: builder.mutation({
      query: (verificationCode) => ({
        url: "/verifycode",
        method: "POST",
        body: { code: verificationCode },
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    verifyCodeEmail: builder.mutation({
      query: (data) => ({
        method: "GET",
        url: `/verify-email?verificationCode=${data.verificationCode}`,
        credentials: "include",
      }),
      
    }),
    resetPassword: builder.mutation({
      query: ({ password, passwordConfirm, token }) => ({
        url: `/resetpassword/${token}`,
        method: "PATCH",
        body: { password, passwordConfirm },
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),   
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "/forgetpassword",
        method: "POST",
        body: email,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    // deleteAccount: builder.mutation({
    //   query: (currentPassword, accessToken) => ({
    //     url: "/delete-me",
    //     method: "DELETE",
    //     body: currentPassword,
    //     credentials: "include",
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   }),
    // }) 
  }),
});

export const {
  useGetproductByNameQuery,
  useSignInMutation,
  useSignUpMutation,
  useVerifyCodePasswordMutation,
  useVerifyCodeEmailMutation,
  useResetPasswordMutation,
  useForgetPasswordMutation,
  //useDeleteAccountMutation
} = productApi;
