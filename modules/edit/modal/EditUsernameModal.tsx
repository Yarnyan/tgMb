import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { useSetUsernameMutation } from '../../../store/api/User';
import { setUsernameForProfile } from '@/store/reducers/profileSlice';

type Props = {
    onClose: () => void;
};

type FormValues = {
    username: string;
};

export default function EditUsernameModal({ onClose }: Props) {
    const profile = useAppSelector((state) => state.profile.profile);
    const [setUsername] = useSetUsernameMutation();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            username: profile.username || '',
        },
    });

    const onSubmit = async (data: FormValues) => {
        try {
            const res = await setUsername(data.username);
            console.log(res)
            if (res.error && 'data' in res.error) {
                setErrorMessage(res.error.data?.message || 'An error occurred');
            } else {
                dispatch(setUsernameForProfile(data.username));
                onClose();
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred');
        }
    };
    console.log(profile)
    return (
        <View className="absolute top-[40%] -translate-y-[50%] w-[90%] max-w-[400px] bg-[#202020] rounded-[20px] max-h-[70dvh] overflow-hidden z-1000">
            <View className="p-4 w-full h-full">
                <Text className="text-base font-normal text-dark-callsBarCallNameColor">Edit username</Text>
                <View className="flex flex-col w-full mt-2">
                    <Text className="text-sm font-medium text-dark-callsBarCallDateColor">Username</Text>
                    <Controller
                        name="username"
                        control={control}
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <TextInput
                                placeholder="Enter username..."
                                className="mt-2 h-12 w-full rounded-[20px] px-4 bg-dark-chatsBarItemColor text-dark-callsBarCallNameColor"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />
                    {errors.username && (
                        <Text className="text-red-500 text-xs mt-1">Username is required</Text>
                    )}
                    <Text className="text-sm font-medium text-dark-callsBarCallDateColor mt-2">
                        You can use a-z, 0-9 and underscores. Minimum length is 6 characters.
                    </Text>
                    {errorMessage && (
                        <Text className="text-center text-[#f8717c] mt-2">{errorMessage}</Text>
                    )}
                </View>
                <View className="mt-4 flex-row justify-end">
                    <TouchableOpacity 
                        onPress={onClose}
                        className="px-4 py-2 rounded-[20px]"
                    >
                        <Text className="text-dark-callsBarCallDateColor">Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={handleSubmit(onSubmit)}
                        className="ml-2 bg-dark-createModalHoverColorButton px-4 py-2 rounded-[20px]"
                    >
                        <Text className="text-dark-callsBarCallDateColor">Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}