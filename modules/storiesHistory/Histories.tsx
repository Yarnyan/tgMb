import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from 'expo-router';
import { IHistory } from './types/types';
import History from './components/History';

const screenWidth = Dimensions.get('window').width;

const Histories = () => {
    const navigation = useNavigation();
    const histories: IHistory[] = [
        {
            id: 1,
            name: 'History 1',
            src: require('../../assets/image/3.png'),
            date: '2023-10-01T12:00:00Z'
        },
        {
            id: 2,
            name: 'History 2',
            src: require('../../assets/image/1.jpg'),
            date: '2023-10-01T12:00:00Z'
        },
        {
            id: 3,
            name: 'History 3',
            src: require('../../assets/image/2.jpg'),
            date: '2023-11-01T12:00:00Z'
        },
    ];

    let lastDisplayedDate = '';

    return (
        <View className='h-full w-full'>
            <View className='bg-dark-activeTab w-full h-[100px] px-[16px] flex flex-col justify-between pb-[12px]'>
                <View className='flex flex-row justify-between mt-[50px]' style={{ width: screenWidth - 50 }}>
                    <View className='w-full flex flex-row items-center'>
                        <View>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name="chevron-back" size={24} color="#AEAEAE" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text className='text-[20px] font-medium text-dark-storiesBarMenuTextColor ml-[12px]'>Stories</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View className='w-full h-full bg-dark-asideColor'>
                {histories.map((history) => {
                    const formattedDate = new Date(history.date).toLocaleDateString();
                    const shouldDisplayDate = formattedDate !== lastDisplayedDate;
                    if (shouldDisplayDate) {
                        lastDisplayedDate = formattedDate;
                    }

                    return (
                        <View key={history.id}>
                            {shouldDisplayDate && (
                                <View className='w-full px-[20px] h-[40px] bg-dark-optionsTab'>
                                    <Text className='text-dark-storiesBarMenuTextColor text-[16px] font-medium mt-[10px]'>
                                        {formattedDate}
                                    </Text>
                                </View>
                            )}
                            <History history={history} />
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

export default Histories;