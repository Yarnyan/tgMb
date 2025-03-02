import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../base/base'

export const channelApi = createApi({
    reducerPath: 'channelApi',
    baseQuery: baseQueryWithReauth('http://192.168.0.44:5199/' + 'api'),
    endpoints: (builder) => ({
        createChannel: builder.mutation({
            query: (data) => ({
                url: 'Channel/createChannel',
                method: 'POST',
                body: data
            }),
        })
    }),
})

export const { useCreateChannelMutation } = channelApi