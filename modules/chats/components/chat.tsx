import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setActiveChat } from '../../../store/reducers/chatSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  chat: any;
  searchValue?: string;
};

const screenWidth = Dimensions.get('window').width;

const Chat = ({ chat, searchValue }: Props) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const activeChat = useAppSelector((state) => state.chat.activeChat);
  const phoneUser = useAppSelector((state) => state.chat.searchUserForPhone)
  const handlePress = async () => {
    dispatch(setActiveChat(chat));
    navigation.navigate('chat', { chatId: chat.id });
    await AsyncStorage.setItem('activeChat', JSON.stringify(chat));
  };
  const displayName = searchValue && phoneUser ? phoneUser
    : chat?.chatName || chat?.username || chat?.channel?.name || chat?.name || '';
    
  return (
    <TouchableOpacity
      className={`flex flex-row justify-between items-center px-[16px] py-[12px]`}
      onPress={handlePress}
      style={{
        width: screenWidth,
        backgroundColor: 'transparent'
      }}
    >
      <View className="flex flex-row items-center w-full">
        <Image
          source={chat?.avatar ? { uri: 'http://192.168.0.44:5199/' + chat.avatar } : chat && require('../../../assets/image/user.png')}
          className="rounded-full w-[50px] h-[50px]"
        />
        <View className="ml-[14px] flex flex-col w-full justify-between">
          <View className="flex flex-row items-center justify-between w-full">
            <Text className="text-[14px] font-medium text-dark-callsBarCallNameColor">
              {displayName}
            </Text>
          </View>
          {/* <View className="flex flex-row items-center justify-between w-full mt-[6px]">
            <Text className="text-[14px] font-normal text-dark-callsBarCallDateColor">
              {chat?.lastMessage || ''}
            </Text>
            {chat.unreadMessages > 0 && (
              <View className="flex justify-center items-center text-[12px] font-medium text-dark-chatsMessageUnread bg-dark-chatsBarActiveButtonTextColor w-[20px] h-[20px] rounded-full">
                <Text>{chat.unreadMessages}</Text>
              </View>
            )}
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Chat;
