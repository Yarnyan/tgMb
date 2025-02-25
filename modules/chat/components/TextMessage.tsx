import React from 'react';
import { View, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppSelector } from '@/hooks/redux';

type Props = {
  message: any;
};

export default function TextMessage({ message }: Props) {
  const profile = useAppSelector((state) => state.profile.profile);
  return (
    <View className="flex flex-row items-end my-4 max-w-[200px] w-full " style={{}}>
      <View>
        <Image
          source={message?.fromUser?.avatar ? { uri: message?.fromUser?.avatar } : require('../../../assets/image/user.png')}
          className="w-10 h-10 rounded-full"
        />
      </View>

      <View
        className={`ml-2 py-2 px-4 min-h-[56px] rounded-[20px] ${
          message?.fromUser?.id === profile.id
            ? 'bg-dark-myMessageColor'
            : 'bg-dark-chatsBarItemColor'
        }`}
      >

        <Text className="text-dark-callsBarCallNameColor text-base font-medium">
          {message?.text}
        </Text>

        <View className="flex-row justify-end items-center mt-2 w-full">
          <Text className="text-dark-callsBarCallDateColor text-sm font-medium">
            {message?.time}
          </Text>
          <Icon
            name="done-all"
            size={14}
            color={message?.isRead ? '#58A0FD' : '#909090'}
            className="ml-2"
          />
        </View>
      </View>
    </View>
  );
}