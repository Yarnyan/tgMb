import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../base/base';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth('' + 'api'),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: 'auth/register',
        method: 'POST',
        body: data,
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: 'auth/refresh-token',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useRefreshMutation } = authApi;