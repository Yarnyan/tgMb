import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../base/base'

export const groupApi = createApi({
    reducerPath: 'groupApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        addUserGroup: builder.mutation({
            query: (data) => ({
                url: 'Group/addUserToGroup',
                method: 'POST',
                body: data
            }),
        }),
        createGroup: builder.mutation({
            query: (data) => ({
                url: 'Group/createGroup',
                method: 'POST',
                body: data
            }),
        }),
        createChannel: builder.mutation({
            query: (data) => ({
                url: 'Channel/createChannel',
                method: 'POST',
                body: data
            }),
        }),
        subcChannel: builder.mutation({
            query: (data) => ({
                url: 'Channel/subscribe',
                method: 'POST',
                body: data
            }),
        }),
        unsubcChannel: builder.mutation({
            query: (data) => ({
                url: 'Channel/unsubscribe',
                method: 'POST',
                body: data
            }),
        }),
    }),
})

export const { useAddUserGroupMutation, useCreateGroupMutation, useCreateChannelMutation, useUnsubcChannelMutation, useSubcChannelMutation} = groupApi