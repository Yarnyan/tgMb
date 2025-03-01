import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';

const Proxy = () => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            proxyType: 'http',
            proxyAddress: '',
        },
    });

    const options = [
        { value: 'http', label: 'HTTP' },
        { value: 'socks5', label: 'SOCKS5' },
    ];

    const onSubmit = (data) => {
        console.log('Submitted data:', data);

        reset();
    };

    return (
        <View className='h-full w-full flex flex-col'>
            <View className='bg-[#202020] w-full h-[100px] px-[16px] flex flex-col justify-between pb-[12px]'>
                <View className='flex flex-row justify-between mt-[50px]'>
                    <View className='w-full flex flex-row items-center'>
                        <View>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="chevron-back" size={30} color="#AEAEAE" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text className='text-[20px] font-medium text-dark-storiesBarMenuTextColor ml-[12px]'>Proxy</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View className="p-4 w-full bg-dark-activeTab">
                <Controller
                    control={control}
                    name="proxyType"
                    render={({ field: { onChange, value } }) => (
                        <RNPickerSelect
                        onValueChange={(value) => console.log(value)}
                        items={options}
                      />
                    )}
                />

                <Controller
                    control={control}
                    name="proxyAddress"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="Enter username..."
                            className="mt-2 h-12 w- full rounded-[20px] px-4 bg-dark-chatsBarItemColor text-dark-callsBarCallNameColor"
                            placeholderTextColor="#AEAEAE"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />

                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    className="bg-primary p-2 rounded mt-4"
                >
                    <Text className="text-white text-center">Apply</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Proxy;