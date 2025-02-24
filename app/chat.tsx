import React from 'react';
import { View } from 'react-native';
import Chat from '@/modules/chat/Chat';

const ChatPage = () => {
    return (
        <View className='flex h-full'>
            <Chat />
        </View>
    );
}

export default ChatPage;
