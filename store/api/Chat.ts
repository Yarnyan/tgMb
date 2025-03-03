import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../base/base'

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseQueryWithReauth,
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
    getChannelByName: builder.query({
      query: (name) => ({
        url: `Chat/search?name=${name}`,
        method: 'GET',
      }),
    }),
    getBotsByName: builder.query({
      query: (name) => ({
        url: `Chat/searchBot?name=${name}`,
        method: 'GET',
      }),
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
    sendMessageBot: builder.mutation({
      query: (data) => ({
        url: 'Chat/sendMessageBot',
        method: 'POST',
        body: data
      }),
    }),
  }),
})

export const { useSendMessageMutation, useGetMessageQuery, useGetChatsQuery, useSendMessageChatMutation, useGetMessageWithUserQuery, useSendMessageBotMutation, useGetChannelByNameQuery, useGetBotsByNameQuery} = chatApi