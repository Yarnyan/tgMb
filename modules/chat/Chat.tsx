import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import ChatHeader from './components/ChatHeader';
import ChatFooter from './components/ChatFooter';
import TextMessage from './components/TextMessage';
import { useAppSelector } from '../../hooks/redux';
import { useGetMessageQuery, useGetMessageWithUserQuery } from '../../store/api/Chat';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetChatsQuery } from '../../store/api/Chat';
import ChatFooterSub from './components/ChatFooterSub';

type Props = {

};

export default function Chat({ }: Props) {
  const profile = useAppSelector((state) => state.profile.profile);
  const activeChat = useAppSelector((state) => state.chat.activeChat);
  const chats = useAppSelector((state) => state.chat.allChats);

  const connectionRef = useRef<HubConnection | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<any>(null);

  const { data: dataMessage, refetch: refetchMessage, isError } = useGetMessageQuery(
    activeChat?.messages ? activeChat.id : undefined,
    { skip: !activeChat?.messages }
  );

  const { data: dataWithUser, refetch: refetchMessageWithUser, isSuccess: isSuccessWithUser } =
    useGetMessageWithUserQuery(activeChat?.id && activeChat?.privacySettingsId ? activeChat.id : undefined, {
      skip: activeChat?.messages,
    });

  const { data: chatsData, refetch: refetchChats } = useGetChatsQuery(null);

  useEffect(() => {
    if (dataMessage) {
      setMessages(dataMessage.data);
    }
  }, [dataMessage]);

  useEffect(() => {
    if (dataWithUser) {
      setMessages(dataWithUser.data);
    }
  }, [dataWithUser, isSuccessWithUser]);

  useEffect(() => {
    console.log('4443')
    if (activeChat?.messages) {
      refetchMessage();
    } else if (activeChat?.id) {
      refetchMessageWithUser();
    }
  }, [activeChat]);

  useEffect(() => {
    const token = AsyncStorage.getItem('token');
    let isCancelled = false;

    const connection = new HubConnectionBuilder()
      .withUrl(`http://192.168.0.44:5199/ws/messages`, {
        accessTokenFactory: () => Promise.resolve(token || ''),
        headers: {
          'access-control-allow-origin': '*',
        },
      })
      .configureLogging(LogLevel.Information)
      .build();

    connection.start().then(() => console.log('Connection started'));

    connection.on('ReceiveMessage', (message: any) => {
      const chatExists = chats.some((chat: any) => chat.id === message.chatId);
      if (!chatExists) {
        console.log(`Новый чат обнаружен, выполняем повторный запрос на чаты`);
        refetchChats();
      }
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    connection.onclose(async (error: Error) => {
      if (error && error.message.includes('401')) {
        try {
          if (!isCancelled) {
            await connection.start();
          }
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
        }
      } else {
        console.log('Connection closed:', error?.message || 'Unknown reason');
      }
    });

    connection.start().then(() => console.log('Connection started'));
    connectionRef.current = connection;

    return () => {
      connection.off('ReceiveMessage');
      connection.stop().then(() => console.log('Connection stopped'));
    };
  }, [chats]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const isOwner = activeChat?.chatType === 3 && activeChat?.channel?.ownerId === profile?.id;
  const isNotOwner = activeChat?.chatType === 3 && activeChat?.channel?.ownerId !== profile?.id;
  const chatExistsInChatsData = chatsData?.data?.some((chat: any) => chat.id === activeChat?.id);

  return (
    <View className="h-full flex">
      <View className="flex-1">
        <ChatHeader />
        <ScrollView
          className="flex-1"
          contentContainerStyle={styles.messagesContainer}
          ref={messagesEndRef}
          onContentSizeChange={() => messagesEndRef.current?.scrollToEnd({ animated: true })}
        >
          {messages
            ?.filter((item) => item.chatId === activeChat.id)
            .sort((a, b) => a.id - b.id)
            .map((item: any) => (
              <TextMessage key={item.id} message={item} />
            ))}
        </ScrollView>
        {(isNotOwner && !chatExistsInChatsData) ? (
          <ChatFooterSub />
        ) : (!isNotOwner) ? (
          <ChatFooter setMessages={setMessages} />
        ) : ''}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messagesContainer: {
    flexGrow: 1,
  },
});