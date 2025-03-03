import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Switch } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Proxy = () => {
    const {
        control,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            proxyAddress: '',
            proxyAuthEnabled: false,
            proxyUsername: '',
            proxyPassword: '',
        },
    });

    const proxyAuthEnabled = watch('proxyAuthEnabled'); 

    const onSubmit = async (data) => {
        console.log(data);
        try {
            await AsyncStorage.setItem('proxyAddress', data.proxyAddress);
            await AsyncStorage.setItem('proxyAuth', String(data.proxyAuthEnabled));
            if (data.proxyAuthEnabled) {
                await AsyncStorage.setItem('proxyUsername', data.proxyUsername);
                await AsyncStorage.setItem('proxyPassword', data.proxyPassword);
            }
            alert('Proxy settings saved successfully!');
        } catch (error) {
            console.error('Error saving proxy settings:', error);
            alert('Failed to save proxy settings.');
        }
    };

    return (
        <View className="h-full w-full flex flex-col">
            <View className="bg-[#202020] w-full h-[100px] px-[16px] flex flex-col justify-between pb-[12px]">
                <View className="flex flex-row justify-between mt-[50px]">
                    <View className="w-full flex flex-row items-center">
                        <View>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="chevron-back" size={30} color="#AEAEAE" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text className="text-[20px] font-medium text-dark-storiesBarMenuTextColor ml-[12px]">
                                Proxy
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View className="p-4 w-full bg-dark-activeTab">
                <Controller
                    control={control}
                    name="proxyAddress"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="Enter proxy address..."
                            className="mt-2 h-12 w-full rounded-[20px] px-4 bg-dark-chatsBarItemColor text-dark-callsBarCallNameColor"
                            placeholderTextColor="#AEAEAE"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />

                <View className="flex flex-row items-center justify-between px-2">
                    <Text className="text-white">Enable Proxy Authentication</Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#6558E8' }}
                        thumbColor={proxyAuthEnabled ? '#ffffff' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(value) => setValue('proxyAuthEnabled', value)}
                        value={proxyAuthEnabled}
                    />
                </View>
                {proxyAuthEnabled && (
                    <View className="flex flex-row mt-2">
                        <Controller
                            control={control}
                            name="proxyUsername"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    placeholder="Username"
                                    className="mr-2 h-12 flex-1 rounded-[20px] px-4 bg-dark-chatsBarItemColor text-dark-callsBarCallNameColor"
                                    placeholderTextColor="#AEAEAE"
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="proxyPassword"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    placeholder="Password"
                                    secureTextEntry
                                    className="ml-2 h-12 flex-1 rounded-[20px] px-4 bg-dark-chatsBarItemColor text-dark-callsBarCallNameColor"
                                    placeholderTextColor="#AEAEAE"
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                    </View>
                )}
                <View className="w-full justify-center items-center mt-4">
                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        className="bg-[#6558E8] py-3.5 rounded-[20px] w-[100px]"
                    >
                        <Text className="text-white text-center">Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Proxy;