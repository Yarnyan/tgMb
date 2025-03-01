import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../base/base'

export const groupApi = createApi({
    reducerPath: 'groupApi',
    baseQuery: baseQueryWithReauth('http://192.168.0.5:5199/' + 'api'),
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
    }),
})

export const { useAddUserGroupMutation, useCreateGroupMutation } = groupApi