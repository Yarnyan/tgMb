import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setActiveChat } from '../../../store/reducers/chatSlice';
import { IChat } from '../types/types';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';

type Props = {
    chat: IChat;
};

const screenWidth = Dimensions.get('window').width;

export default function Chat({ chat }: Props) {
    const activeChat = useAppSelector((state) => state.chat.activeChat);
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    function extractTime(isoString: string): string {
        const date = new Date(isoString);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    const handlePress = () => {
        dispatch(setActiveChat(chat));
        // Сохранение активного чата, например, в AsyncStorage
        // AsyncStorage.setItem('activeChat', JSON.stringify(chat));
        // navigation.navigate('', { chatId: chat.id });
    };

    return (
        <TouchableOpacity
            className={`flex flex-row justify-between items-center px-[16px] py-[12px]`}
            onPress={handlePress}
            style={{width: screenWidth - 60}}
        >
            <View className="flex flex-row items-center w-full">
                <Image source={chat.src} className="rounded-full w-[50px] h-[50px]" />
                <View className="ml-[14px] flex flex-col w-full justify-between">
                    <View className="flex flex-row items-center justify-between w-full">
                        <Text className="text-[14px] font-medium text-dark-callsBarCallNameColor">{chat.name}</Text>
                        <Text className="text-[12px] font-medium text-dark-chatsBarButtonTextColor">{extractTime(chat.lastMessageTime)}</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between w-full mt-[6px]">
                        <Text className="text-[14px] font-normal text-dark-callsBarCallDateColor">{chat.lastMessage}</Text>
                        {chat.unreadMessages > 0 && (
                            <View className="flex justify-center items-center text-[12px] font-medium text-dark-chatsMessageUnread bg-dark-chatsBarActiveButtonTextColor w-[20px] h-[20px] rounded-full">
                                <Text>{chat.unreadMessages}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
