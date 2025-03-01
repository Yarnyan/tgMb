import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../base/base'

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseQueryWithReauth('http://192.168.0.5:5199/' + 'api'),
  tagTypes: ['messages'],
  endpoints: (builder) => ({
    getMessage: builder.query({
      query: (data) => ({
        url: `Chat/messages?chatId=${data}&isSecret=false`,
        method: 'GET',
      }),
      providesTags: ['messages'],
    }),
    getMessageWithUser: builder.query({
      query: (data) => ({
        url: `Chat/messagesWithUser?userId=${data}&isSecret=false`,
        method: 'GET',
      }),
      providesTags: ['messages'],
    }),
    sendMessage: builder.mutation({
      query: (data) => ({
        url: 'Chat/sendMessageUser',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['messages'],
    }),
    sendMessageChat: builder.mutation({
      query: (data) => ({
        url: 'Chat/sendMessageChat',
        method: 'POST',
        body: data
      }),
    }),
    getChats: builder.query({
      query: () => ({
        url: 'Chat/chats',
        method: 'GET',
      }),
      providesTags: ['messages']
    }),
  }),
})

export const { useSendMessageMutation, useGetMessageQuery, useGetChatsQuery, useSendMessageChatMutation, useGetMessageWithUserQuery } = chatApi