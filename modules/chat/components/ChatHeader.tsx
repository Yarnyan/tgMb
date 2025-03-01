import React, { useState } from 'react';
import { View, Pressable, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { selectTab, toggleMoreTab, setMoreTab } from '../../../store/reducers/chatSlice';

type Props = {

};

export default function ChatHeader({ }: Props) {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | any>(null);
    const activeChat = useAppSelector((state) => state.chat.activeChat);
    const activeTabChat = useAppSelector((state) => state.chat.activeTabChat);
    const activeMoreTab = useAppSelector((state) => state.chat.activeMoreTab);

    const formatLastSeen = (lastMessageTime: string) => {
        const lastSeenDate = new Date(lastMessageTime);
        const now = new Date();
        const isToday =
            lastSeenDate.toDateString() === now.toDateString();
        const isYesterday =
            lastSeenDate.getDate() === now.getDate() - 1 &&
            lastSeenDate.getMonth() === now.getMonth() &&
            lastSeenDate.getFullYear() === now.getFullYear();
        const options: any = { hour: '2-digit', minute: '2-digit' };
        const timeString = lastSeenDate.toLocaleTimeString([], options);
        if (isToday) {
            return `Last seen today at ${timeString}`;
        } else if (isYesterday) {
            return `Last seen yesterday at ${timeString}`;
        } else {
            return `Last seen on ${lastSeenDate.toLocaleDateString()} at ${timeString}`;
        }
    };

    const handleOptionsClick = () => {
        setAnchorEl(!anchorEl);
    };

    const handleSearchClick = () => {
        const newTab: any = activeTabChat === 'search' ? 'users' : 'search';
        dispatch(selectTab(newTab));
    };

    const handleMoreClick = () => {
        if (activeChat?.chatType === 1 || activeChat?.chatType === 0) {
            dispatch(setMoreTab(0));
        } else {
            dispatch(setMoreTab(-1));
        }
        dispatch(toggleMoreTab());
    };

    return (
        <View className="bg-dark-activeTab">
            <View className="px-5 pt-10">
                <View className='flex justify-between items-center flex-row pb-4'>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={28} color="#666666" />
                    </TouchableOpacity>
                    <View className="flex items-center flex-col">
                        <Text className='text-base font-medium text-dark-storiesBarMenuTextColor'>
                            {activeChat?.chatName || activeChat?.username}
                        </Text>
                        <Text className='text-[12px] font-normal text-dark-callsCalendarCallTextColor'> {activeChat?.lastMessageTime
                            ? formatLastSeen(activeChat.lastMessageTime)
                            : 'Last seen not available'}</Text>
                    </View>
                    <View>
                        <Image
                            source={activeChat?.avatar ? { uri: 'http://192.168.0.44:5199/' + activeChat.avatar } : activeChat && require('../../../assets/image/user.png')}
                            resizeMode="cover"
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                            }}
                        />
                    </View>
                </View>
            </View>

            <View className="bg-dark-pinnedMessage h-16 px-5 py-4 flex-row items-center justify-between">
                <View>
                    <Text className="text-dark-pinnedMessageTextColor text-base font-semibold">
                        Pinned Message
                    </Text>
                    <Text className="text-sm font-normal text-dark-iconsColor mt-1">
                        Text
                    </Text>
                </View>
                <Icon name="push-pin" size={24} color="#AEAEAE" />
            </View>
        </View>
    );
}