import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Call from './components/Call';
import { ICall, MediaType } from './types/types';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Calls = () => {
    const navigation = useNavigation();

    const data: ICall[] = [
        {
            id: 1,
            name: 'John Doe',
            date: 'Sep, 18, 18:28',
            src: 'https://i.pinimg.com/736x/58/79/ce/5879ce28c1cc53e3d020a64a0ef65bc3.jpg',
            type: MediaType.Call,
        },
        {
            id: 2,
            name: 'John Doe',
            date: 'Sep, 18, 18:28',
            src: 'https://i.pinimg.com/736x/f3/d3/74/f3d374d9e988a32a2e7f8c8ce84a4c20.jpg',
            type: MediaType.Video,
        },
        {
            id: 3,
            name: 'John Doe',
            date: 'Sep, 18, 18:28',
            src: 'https://i.pinimg.com/736x/2d/a0/bd/2da0bd2eeda03f0d48dff530c8a9497a.jpg',
            type: MediaType.Video,
        },
    ];

    return (
        <View className='h-full w-full'>
            <View className='bg-dark-activeTab w-full h-[100px] px-[16px] flex flex-col justify-between pb-[12px]'>
                <View className='flex flex-row justify-between mt-[50px]'>
                    <View className='w-full flex flex-row items-center'>
                        <View>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name="chevron-back" size={30} color="#AEAEAE" />
                            </TouchableOpacity>
                        </View>
                        <View className=''>
                            <Text className='text-[20px] font-medium text-dark-storiesBarMenuTextColor ml-[12px]'>Calls</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View className='w-full h-full pt-[16px] bg-dark-asideColor'>
                <ScrollView className=''>
                    {data.map(call => <Call key={call.id} call={call} />)}
                </ScrollView>
            </View>
        </View>
    );
}

export default Calls;