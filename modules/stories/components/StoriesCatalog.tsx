import React from 'react';
import { View, Image, Text } from 'react-native';
import { IStories } from '../types/types';

type Props = {
    story: IStories
}

const StoriesCatalog = ({story}: Props) => {
    return (
        <View className='h-[74px] px-[20px] py-[12px] flex flex-row w-full'>
            <View>
                <Image source={story.src} className='w-[50px] h-[50px]'/>
            </View>
            <View className='ml-[12px]'>
                <Text className='text-dark-storiesBarMenuTextColor text-[16px] font-medium'>{story.name}</Text>
                <Text className='text-dark-chatsBarButtonTextColor text-[14px] font-medium mt-[8px]'>{story.total} stories</Text>
            </View>
        </View>
    );
}

export default StoriesCatalog;
