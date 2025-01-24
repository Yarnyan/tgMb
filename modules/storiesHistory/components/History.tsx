import React from 'react';
import { View, Text, Image } from 'react-native';
import { IHistory } from '../types/types';
type Props = {
    history: IHistory
}
const History = ({ history }: Props) => {
    return (
        <View className='h-[74px] px-[20px] py-[12px] flex flex-row w-full items-center'>
            <View>
                <Image source={history.src} className='w-[50px] h-[50px] rounded-full'/>
            </View>
            <View className='ml-[12px]'>
                <Text className='text-dark-storiesBarMenuTextColor text-[16px] font-medium'>{history.name}</Text>
            </View>
        </View>
    );
}

export default History;
