import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Chat from './components/chat';
import { IChat } from './types/types';

const ChatsBar = () => {
    const [activeTab, setActiveTab] = useState<'All' | 'Channels' | 'Groups'>('All');

    const chats: IChat[] = [
        {
            id: 1,
            name: "Alice",
            lastMessage: "Hey, how are you?",
            lastMessageTime: "2023-10-01T12:00:00Z",
            unreadMessages: 2,
            src: require('../../assets/image/1.jpg')
        },
        {
            id: 2,
            name: "Bob",
            lastMessage: "Are we still on for tomorrow?",
            lastMessageTime: "2023-10-01T13:00:00Z",
            unreadMessages: 0,
            src: require('../../assets/image/1.jpg')
        },
        {
            id: 3,
            name: "Charlie",
            lastMessage: "Check this out!",
            lastMessageTime: "2023-10-01T14:00:00Z",
            unreadMessages: 5,
            src: require('../../assets/image/1.jpg')
        },
        {
            id: 4,
            name: "Diana",
            lastMessage: "Let's catch up soon.",
            lastMessageTime: "2023-10-01T15:00:00Z",
            unreadMessages: 1,
            src: require('../../assets/image/1.jpg')
        },
        {
            id: 5,
            name: "Eve",
            lastMessage: "Happy Birthday!",
            lastMessageTime: "2023-10-01T16:00:00Z",
            unreadMessages: 3,
            src: require('../../assets/image/1.jpg')
        }
    ];

    return (
        <View className={`w-full h-full bg-dark-asideColor`}>
            <View className="w-full h-full">
                <View className='h-[54px]'>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-[16px] flex flex-row gap-2 bg-dark-chatsBarColor">
                        {['All', 'Channels', 'Groups'].map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab as 'All' | 'Channels' | 'Groups')}
                                className={`flex flex-row rounded-[20px] px-[8px] py-[12px] h-[44px] ${activeTab === tab
                                    ? 'bg-dark-chatsBarActiveButtonColor'
                                    : 'bg-dark-chatsBarItemColor'
                                    }`}
                            >
                                <Text
                                    className={`text-[14px] font-medium ${activeTab === tab
                                        ? 'text-dark-chatsBarActiveButtonTextColor'
                                        : 'text-dark-chatsBarButtonTextColor'
                                        }`}
                                >
                                    {tab}
                                </Text>
                                <Text
                                    className={`ml-[8px] px-[7px] rounded-[30px] ${activeTab === tab
                                        ? 'text-dark-chatsBarActiveButtonTextColor bg-dark-chatsBarActiveContainerMessageColor'
                                        : 'text-dark-chatsBarButtonTextColor bg-dark-chatsBarContainerMessageColor'
                                        }`}
                                >
                                    10
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <View>
                    <ScrollView>
                        <View className='bg-dark-asideColor'>
                            {chats.map((chat) => (
                                <Chat key={chat.id} chat={chat} />
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default ChatsBar;
