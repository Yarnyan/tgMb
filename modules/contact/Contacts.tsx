import React from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import Contact from './components/Call';
import { IContact } from './types/types';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Contacts = () => {
    const navigation = useNavigation();
    const data: IContact[] = [
        {
            id: 1,
            name: 'Mary',
            src: require('../../assets/image/1.jpg'),
            last: 'last seen today at 17:00'
        },
        {
            id: 2,
            name: 'Mila Corn',
            src: require('../../assets/image/1.jpg'),
            last: 'Online'
        },
        {
            id: 3,
            name: 'Alex Jensen',
            src: require('../../assets/image/1.jpg'),
            last: 'last seen yesterday at 11:30'
        },
    ];

    return (
        <View className='h-full w-full'>
            <View className='bg-dark-activeTab w-full h-[100px] px-[16px] flex flex-col justify-between pb-[12px]'>
                <View className='flex flex-row justify-between mt-[50px]'>
                    <View className='w-full flex flex-row items-center'>
                        <View>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name="chevron-back" size={30 } color="#AEAEAE" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text className='text-[20px] font-medium text-dark-storiesBarMenuTextColor ml-[12px]'>Contacts</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View className='w-full h-full bg-dark-asideColor'>
                <ScrollView className='w-full h-full'>
                    {data.map(call => <Contact key={call.id} contact={call} />)}
                </ScrollView>
            </View>
        </View>
    );
}

export default Contacts;