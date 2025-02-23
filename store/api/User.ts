import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../base/base'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithReauth('' + 'api'),
    tagTypes: ['updateProfile'],
    endpoints: (builder) => ({
        getUserByUsername: builder.query({
            query: (username) => ({
                url: `User/getUserByUsername?username=${username}`,
                method: 'GET',
            }),
        }),
        getUserByPhone: builder.query({
            query: (phone) => ({
                url: `User/getUserByPhone?phone=${phone}`,
                method: 'GET',
            }),
        }),
        getMe: builder.query({
            query: () => ({
                url: 'User/getMe',
                method: 'GET',
            }),
            providesTags: ['updateProfile']
        }),
        setUsername: builder.mutation({
            query: (data) => ({
                url: `User/setUsername?username=${data}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['updateProfile']
        }),
        setAvatar: builder.mutation({
            query: (data) => ({
                url: 'User/avatar',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['updateProfile']
        })
    }),
})

export const { useGetUserByUsernameQuery, useGetUserByPhoneQuery, useGetMeQuery, useSetUsernameMutation, useSetAvatarMutation } = userApi