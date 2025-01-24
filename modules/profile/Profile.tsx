import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { IAccount } from './types/types';
import Account from './components/account';
import Feather from '@expo/vector-icons/Feather';
import PlusIcon from './components/plusIcon';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Svg, { Path } from 'react-native-svg';

const Profile = () => {
    const navigation = useNavigation();
    const accounts: IAccount[] = [
        {
            id: 1,
            name: 'Account 1',
            src: require('../../assets/image/1.jpg')
        },
        {
            id: 2,
            name: 'Account 2',
            src: require('../../assets/image/2.jpg')
        },
    ]
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
                        <View>
                            <Text className='text-[20px] font-medium text-dark-storiesBarMenuTextColor ml-[12px]'>My Profile</Text>
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView className='w-full h-full bg-dark-asideColor px-[16px]'>
                <View className='w-full h-full bg-dark-asideColor'>
                    <View className='flex flex-row items-center mt-[28px]'>
                        <View>
                            <Image source={require('../../assets/image/1.jpg')} className='w-[70px] h-[70px] rounded-full'></Image>
                        </View>
                        <View className='ml-[14px]'>
                            <Text className='text-[20px] font-medium text-dark-storiesBarMenuTextColor'>Anna Forton</Text>
                            <Text className='text-[16px] font-medium text-dark-asideTextColor'>@annasya</Text>
                        </View>
                    </View>
                    <View className='bg-dark-activeTab mt-[20px] rounded-[20px] px-[16px]'>
                        {accounts.map((account) => (
                            <Account key={account.id} account={account} />
                        ))}
                        <View className='flex flex-row items-center h-[48px]'>
                            <Ionicons name="add" size={24} color="#AEAEAE" />
                            <View className='w-max'>
                                <Text className='text-[16px] font-medium text-dark-callsBarCallNameColor ml-[14px]'>Add account</Text>
                            </View>
                        </View>
                    </View>
                    <View className='bg-dark-activeTab mt-[20px] rounded-[20px] px-[16px]'>
                        <View className='flex flex-row items-center border-b-[2px] border-dark-asideColor h-[48px]'>
                            <Ionicons name="notifications-outline" size={24} color="#AEAEAE" />
                            <View className='w-max'>
                                <Text className='text-[16px] font-medium text-dark-callsBarCallNameColor ml-[14px]'>Notifications & Sonds</Text>
                            </View>
                        </View>
                        <View className='flex flex-row items-center border-b-[2px] border-dark-asideColor h-[48px]'>
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <Path d="M20.8535 11.1198C20.8535 16.0098 17.3035 20.5898 12.4535 21.9298C12.1235 22.0198 11.7634 22.0198 11.4334 21.9298C6.58344 20.5898 3.03345 16.0098 3.03345 11.1198V6.72979C3.03345 5.90979 3.65346 4.97979 4.42346 4.66979L9.99344 2.38982C11.2434 1.87982 12.6534 1.87982 13.9034 2.38982L19.4734 4.66979C20.2334 4.97979 20.8635 5.90979 20.8635 6.72979L20.8535 11.1198Z" stroke="#AEAEAE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <Path d="M11.9434 12.5C13.0479 12.5 13.9434 11.6046 13.9434 10.5C13.9434 9.39543 13.0479 8.5 11.9434 8.5C10.8388 8.5 9.94336 9.39543 9.94336 10.5C9.94336 11.6046 10.8388 12.5 11.9434 12.5Z" stroke="#AEAEAE" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <Path d="M11.9434 12.5V15.5" stroke="#AEAEAE" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            </Svg>
                            <View className='w-max'>
                                <Text className='text-[16px] font-medium text-dark-callsBarCallNameColor ml-[14px]'>Privacy</Text>
                            </View>
                        </View>
                        <View className='flex flex-row items-center border-b-[2px] border-dark-asideColor h-[48px]'>
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z" stroke="#AEAEAE" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <Path d="M15.9965 11H16.0054" stroke="#AEAEAE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <Path d="M11.9955 11H12.0045" stroke="#AEAEAE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <Path d="M7.99451 11H8.00349" stroke="#AEAEAE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </Svg>
                            <View className='w-max'>
                                <Text className='text-[16px] font-medium text-dark-callsBarCallNameColor ml-[14px]'>Chat settings</Text>
                            </View>
                        </View>
                        <View className='flex flex-row items-center border-b-[2px] border-dark-asideColor h-[48px]'>
                            <Feather name="pie-chart" size={24} color="#AEAEAE" />
                            <View className='w-max'>
                                <Text className='text-[16px] font-medium text-dark-callsBarCallNameColor ml-[14px]'>Storage</Text>
                            </View>
                        </View>
                        <View className='flex flex-row items-center border-b-[2px] border-dark-asideColor h-[48px]'>
                            <Entypo name="language" size={24} color="#AEAEAE" />
                            <View className='w-[90%] flex flex-row justify-between'>
                                <Text className='text-[16px] font-medium text-dark-callsBarCallNameColor ml-[14px]'>Language</Text>
                                <Text className='text-[14px] font-medium text-dark-asideTextColor'>English</Text>
                            </View>
                        </View>
                    </View>
                    <View className='bg-dark-activeTab mt-[20px] rounded-[20px] px-[16px]'>
                        <View className='flex flex-row items-center border-b-[2px] border-dark-asideColor h-[48px]'>
                            <PlusIcon />
                            <View className='w-max'>
                                <Text className='text-[16px] font-medium text-dark-callsBarCallNameColor ml-[14px]'>Premium Plus</Text>
                            </View>
                        </View>
                        <View className='flex flex-row items-center h-[48px]'>
                            <AntDesign name="gift" size={24} color="#AEAEAE" />
                            <View className='w-max'>
                                <Text className='text-[16px] font-medium text-dark-callsBarCallNameColor ml-[14px]'>Send a gift</Text>
                            </View>
                        </View>
                    </View>
                    <View className='bg-dark-activeTab mt-[20px] rounded-[20px] px-[16px] py-[12px] mb-[20px]'>
                        <View className='flex flex-row items-center'>
                            <Feather name="more-horizontal" size={24} color="#AEAEAE" />
                            <View className='w-max'>
                                <Text className='text-[16px] font-medium text-dark-callsBarCallNameColor ml-[14px]'>TeleCone FAQ</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default Profile;
