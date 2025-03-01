import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../base/base'

export const privacyApi = createApi({
  reducerPath: 'privacyApi',
  baseQuery: baseQueryWithReauth('http://192.168.0.5:5199/' + 'api'),
  endpoints: (builder) => ({
    changeProfileVisible: builder.mutation({
      query: (data) => ({
        url: 'Privacy/profileVisible',
        method: 'PATCH',
        body: data
      })
    }),
    changePhoneVisible: builder.mutation({
      query: (data) => ({
        url: 'Privacy/phoneVisible',
        method: 'PATCH',
        body: data
      })
    })
  }),
})

export const { useChangeProfileVisibleMutation, useChangePhoneVisibleMutation } = privacyApi