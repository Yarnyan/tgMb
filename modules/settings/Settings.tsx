import React from 'react';
import { View, Image, Text, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { Ionicons } from '@expo/vector-icons';
import { router, Link } from 'expo-router';

type Props = {};

const Settings = ({ }: Props) => {
    const dispatch = useAppDispatch();
    const profile = useAppSelector((state) => state.profile.profile);

    return (
        <ScrollView>
            <View className="w-full flex flex-col">
                <View className='bg-dark-activeTab w-full h-[100px] px-[16px] flex flex-col justify-between pb-[12px]'>
                    <View className='flex flex-row justify-between mt-[50px]'>
                        <View className='w-full flex flex-row items-center'>
                            <View>
                                <TouchableOpacity onPress={() => router.back()}>
                                    <Ionicons name="chevron-back" size={30} color="#AEAEAE" />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text className='text-[20px] font-medium text-dark-storiesBarMenuTextColor ml-[12px]'>Settings & Privacy</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="p-4 w-full flex flex-col bg-dark-activeTab pt-10">
                    <View className="mt-4 flex flex-col items-center">
                        <Image
                            source={profile.avatar ? { uri: 'http://192.168.0.44:5199/' + profile.avatar } : require('../../assets/image/user.png')}
                            className="w-32 h-32 rounded-full"
                        />
                        <Text className="text-2xl font-semibold text-dark-callsBarCallNameColor mt-4">
                            {profile?.username}
                        </Text>
                        <Text className="text-base font-medium text-dark-callsBarCallDateColor">Online</Text>
                    </View>
                    <View className="flex-row items-center mt-4 justify-center gap-4 mt-2">
                        <Pressable
                            className="w-12 h-12 rounded-full bg-dark-createModalHoverColorButton flex items-center justify-center"
                        >
                            <Link href={'/editSettings'}>
                                <Icon name="create" size={24} color="#AEAEAE" /></Link>
                        </Pressable>
                        <Pressable className="w-12 h-12 rounded-full bg-dark-createModalHoverColorButton flex items-center justify-center">
                            <Icon name="share-outline" size={24} color="#AEAEAE" />
                        </Pressable>
                    </View>
                </View>

                <View className="mt-4 p-4 w-full flex flex-col bg-dark-activeTab">
                    <View className="flex flex-col">
                        <Text className="text-base font-medium text-dark-callsBarCallNameColor">+000 00 000 00 00</Text>
                        <Text className="text-sm font-medium text-dark-callsBarCallDateColor mt-1">Mobile</Text>
                    </View>
                    <View className="mt-2 flex flex-col">
                        <Text className="text-base font-medium text-dark-pinnedMessageTextColor">@{profile?.username}</Text>
                        <Text className="text-sm font-medium text-dark-callsBarCallDateColor mt-1">Username</Text>
                    </View>
                    <View className="mt-2 flex flex-col">
                        <Text className="text-base font-medium text-dark-callsBarCallNameColor">UI & UX designer</Text>
                        <Text className="text-sm font-medium text-dark-callsBarCallDateColor mt-1">Bio</Text>
                    </View>
                </View>
                <View className="mt-4 p-4 w-full flex flex-col bg-dark-activeTab">
                    <View className="mt-2 flex flex-col">
                        <Text className="text-base font-medium text-dark-callsBarCallNameColor">Text</Text>
                        <Text className="text-sm font-medium text-dark-callsBarCallDateColor mt-1">Date of birth</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default Settings;