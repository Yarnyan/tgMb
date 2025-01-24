import React from 'react';
import { View, TouchableOpacity, Text, Dimensions, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { IStories } from './types/types';
import StoriesCatalog from './components/StoriesCatalog';
import { Link } from 'expo-router';
import { useNavigation } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

const Stories = () => {
    const navigation = useNavigation();
    const stories: IStories[] = [
        {
            id: 1,
            name: 'Story 1',
            src: require('../../assets/image/3.png'),
            total: 10
        },
        {
            id: 2,
            name: 'Story 2',
            src: require('../../assets/image/3.png'),
            total: 10
        },
    ];

    return (
        <View className='h-full w-full'>
            <View className='bg-dark-activeTab w-full h-[177px] px-[16px] flex flex-col justify-between pb-[12px]'>
                <View className='flex flex-row justify-between mt-[50px]' style={{ width: screenWidth - 50 }}>
                    <View className='w-full flex flex-row items-center'>
                        <View>
                            <TouchableOpacity>
                                <Ionicons name="chevron-back" size={30} color="#AEAEAE" onPress={() => navigation.goBack()} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text className='text-[20px] font-medium text-dark-storiesBarMenuTextColor ml-[12px]'>Stories</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <SimpleLineIcons name="options-vertical" size={18} color="#AEAEAE" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Link href={'/storiesHistory'}>
                        <View className='flex flex-row w-full items-center'>
                            <View className='relative'>
                                <Image source={require('../../assets/icons/Calendar.webp')} className='w-[50px] h-[50px]' />
                            </View>
                            <View className='ml-[12px]'>
                                <Text className='text-dark-storiesBarMenuTextColor text-[16px] font-medium'>Calendar</Text>
                                <Text className='text-dark-chatsBarButtonTextColor text-[14px] font-medium mt-[8px]'>2 total stories</Text>
                            </View>
                        </View>
                    </Link>
                </View>
            </View>
            <View className='w-full bg-dark-asideColor pt-[8px]'>
                <Link href={'/storiesCreate'}>
                    <View className='h-[74px] px-[20px] py-[12px] flex flex-row w-full items-center'>
                        <View className='relative'>
                            <Image source={require('../../assets/image/1.jpg')} className='w-[50px] h-[50px] rounded-full' />
                            <View style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                backgroundColor: '#58A0FD',
                                zIndex: 1,
                                borderColor: '#202020',
                                borderWidth: 3
                            }}>
                                <Ionicons name="add" size={14} color="#fff" />
                            </View>
                        </View>
                        <View className='ml-[12px]'>
                            <Text className='text-dark-storiesBarMenuTextColor text-[16px] font-medium'>Add stories</Text>
                        </View>
                    </View>
                </Link>
            </View>
            <View className='w-full h-full bg-dark-asideColor'>
                {stories.map((story) => {
                    return (
                        <View key={story.id}>
                            <StoriesCatalog story={story} />
                        </View>
                    )
                })}
            </View>
        </View>
    );
}

export default Stories;