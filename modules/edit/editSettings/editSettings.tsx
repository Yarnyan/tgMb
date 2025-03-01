import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, Switch, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setProfileVisible, setPhoneVisible } from '../../../store/reducers/profileSlice';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useChangePhoneVisibleMutation, useChangeProfileVisibleMutation } from "../../../store/api/Privacy";
import EditUsernameModal from '../modal/EditUsernameModal';
import EditAvatarModal from '../modal/EditAvatarModal';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';

type Props = {};

const EditSettings = ({ }: Props) => {
    const dispatch = useAppDispatch();
    const [changePhoneVisible] = useChangePhoneVisibleMutation();
    const [changeProfileVisible] = useChangeProfileVisibleMutation();
    const profileVisible = useAppSelector((state) => state.profile.profileVisible);
    const phoneVisible = useAppSelector((state) => state.profile.phoneVisible);
    const profile = useAppSelector((state) => state.profile.profile);

    const [openEditUsernameModal, setOpenEditUsernameModal] = useState(false);
    const [openEditPhotoModal, setOpenEditPhotoModal] = useState(false);
    const [proxy, setProxy] = useState(false);

    useEffect(() => {
        const loadProxySetting = async () => {
            const storedProxy = await AsyncStorage.getItem('proxy');
            setProxy(storedProxy === 'true');
        };

        loadProxySetting();
    }, []);


    const handleProfileVisibilityChange = (value: boolean) => {
        const formData = new FormData();
        formData.append('profileVisible', String(value));
        changeProfileVisible(formData);
        dispatch(setProfileVisible(value));
    };

    const handlePhoneVisibilityChange = (value: boolean) => {
        const formData = new FormData();
        formData.append('phoneVisible', String(value));
        changePhoneVisible(formData);
        dispatch(setPhoneVisible(value));

    };

    const handleProxyChange = (value: boolean) => {
        AsyncStorage.setItem('proxy', String(value));
        setProxy(value);
    };

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
                                <Text className='text-[20px] font-medium text-dark-storiesBarMenuTextColor ml-[12px]'>Edit Settings & Privacy</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="p-4 w-full bg-dark-activeTab">
                    <View className="mt-4 flex flex-col items-center">
                        <Pressable onPress={() => setOpenEditPhotoModal(true)}>
                            <Image
                                source={profile.avatar ? { uri: 'http://192.168.0.5:5199/' + profile.avatar } : require('../../../assets/image/user.png')}
                                className="w-32 h-32 rounded-full"
                            />
                        </Pressable>
                        <View className="flex justify-between items-center w-full mt-4">
                            <Text className="text-base font-normal text-dark-callsBarCallNameColor">Anna Forton</Text>
                            <Text className="text-base font-medium text-dark-callsBarCallDateColor">54</Text>
                        </View>
                    </View>
                </View>

                <View className="mt-4 p-4 w-full bg-dark-activeTab flex-row justify-between items-center">
                    <View className="flex-row items-center">
                        <Icon name="call-outline" size={24} color="#AEAEAE" />
                        <View className="ml-3">
                            <Text className="text-base font-medium text-dark-callsBarCallNameColor">Phone number</Text>
                            <Text className="text-sm font-medium text-dark-callsBarCallDateColor mt-1">
                                Editable only on mobile
                            </Text>
                        </View>
                    </View>
                    <Text className="text-base font-medium text-dark-callsBarCallDateColor">+000 00 000 00 00</Text>
                </View>

                <View className="mt-4 w-full bg-dark-activeTab">
                    <Pressable
                        onPress={() => setOpenEditUsernameModal(true)}
                        className="w-full p-4 flex-row justify-between items-center"
                    >
                        <View className="flex-row items-center">
                            <Icon name="at" size={24} color="#AEAEAE" />
                            <Text className="ml-3 text-base font-medium text-dark-callsBarCallNameColor">Username</Text>
                        </View>
                        <Text className="text-base font-medium text-dark-callsBarCallDateColor">@{profile.username}</Text>
                    </Pressable>

                    <View className="w-full p-4 flex-row justify-between items-center">
                        <View className="flex-row items-center">
                            <Icon name="person-outline" size={24} color="#AEAEAE" />
                            <Text className="ml-3 text-base font-medium text-dark-callsBarCallNameColor">Name</Text>
                        </View>
                        <Text className="text-base font-medium text-dark-callsBarCallDateColor">Anna Forton</Text>
                    </View>

                    <View className="w-full p-4 flex-row justify-between items-center">
                        <View className="flex-row items-center">
                            <Icon name="gift-outline" size={24} color="#AEAEAE" />
                            <Text className="ml-3 text-base font-medium text-dark-callsBarCallNameColor">Date of birth</Text>
                        </View>
                        <Text className="text-base font-medium text-dark-callsBarCallDateColor">12/12/2000</Text>
                    </View>
                </View>

                <View className="mt-4 w-full bg-dark-activeTab">
                    <View className="w-full p-4 flex-row justify-between items-center h-[70px]">
                        <View className="flex-row items-center">
                            <Icon name="lock-closed-outline" size={24} color="#AEAEAE" />
                            <Text className="ml-3 text-base font-medium text-dark-callsBarCallNameColor">Profile visibility</Text>
                        </View>
                        <Switch value={profileVisible} onValueChange={handleProfileVisibilityChange} />
                    </View>
                    <View className="w-full p-4 flex-row justify-between items-center h-[70px]">
                        <View className="flex-row items-center">
                            <AntDesign name="phone" size={24} color="#AEAEAE" />
                            <Text className="ml-3 text-base font-medium text-dark-callsBarCallNameColor">Phone visibility</Text>
                        </View>
                        <Switch value={phoneVisible} onValueChange={handlePhoneVisibilityChange} />
                    </View>
                    <View className="w-full p-4 flex-row justify-between items-center h-[70px]">
                        <Link className="" href={'/proxy'}>
                            <View className='flex-row items-center'>
                                <MaterialCommunityIcons name="approximately-equal" size={30} color="#AEAEAE" />
                                <Text className="ml-3 text-base font-medium text-dark-callsBarCallNameColor">Proxy</Text>
                            </View>
                        </Link>
                        <Switch value={proxy} onValueChange={handleProxyChange} />
                    </View>
                </View>
            </View>
            {openEditUsernameModal && (
                <Modal transparent={true}>
                    <View style={styles.modalBackground}>
                        <EditUsernameModal onClose={() => setOpenEditUsernameModal(false)} />
                    </View>
                </Modal>
            )}
            {openEditPhotoModal && (
                <Modal transparent={true}>
                    <View style={styles.modalBackground}>
                        <EditAvatarModal onClose={() => setOpenEditPhotoModal(false)} />
                    </View>
                </Modal>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default EditSettings;