import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { IAccount } from '../types/types';

type Props = {
    account: IAccount
}
const Account = ({ account }: Props) => {
    return (
        <View className='flex flex-row items-center h-[48px] border-b-[2px] border-dark-asideColor'>
            <Image source={account.src} className='rounded-full w-[24px] h-[24px]' alt={account.name} />
            <View className='w-max'>
                <Text className='text-[16px] font-medium text-dark-callsBarCallNameColor ml-[14px]'>{account.name}</Text>
            </View>
        </View>
    );
}

export default Account;
