import React, { useState, useEffect } from 'react';
import { View, Image, Pressable, Text, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { useSetAvatarMutation } from '../../../store/api/User';
import * as ImagePicker from 'expo-image-picker';
import { setProfileInfo } from '@/store/reducers/profileSlice';
import { useGetMeQuery } from '../../../store/api/User';
import * as FileSystem from 'expo-file-system';
type Props = {
    onClose: () => void;
};

type FormValues = {
    photo: any;
};

export default function EditAvatarModal({ onClose }: Props) {
    const profile = useAppSelector((state) => state.profile.profile);
    const [setAvatar] = useSetAvatarMutation();
    const { handleSubmit, setValue } = useForm<FormValues>();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [base64String, setBase64String] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const { data: meData, refetch: refetchMe } = useGetMeQuery(null);
    useEffect(() => {
        if (profile.avatar) {
            setSelectedImage('http://192.168.0.5:5199/' + `${profile.avatar}`);
        }
    }, [profile.avatar]);

    const onSubmit = async (data: FormValues) => {
        try {
            if (!selectedImage) {
                setErrorMessage('Пожалуйста, выберите изображение сначала');
                return;
            }
    
            const fileUri = selectedImage;
            const fileInfo = await FileSystem.getInfoAsync(fileUri);
    
            // Создание объекта FormData
            const formData = new FormData();
            formData.append('file', {
                uri: fileUri,
                name: fileInfo.uri.split('/').pop(), // Получение имени файла
                type: 'image/jpeg', // или соответствующий MIME-тип
            });
    
            const res = await setAvatar(formData);
            console.log(res);
            if (res.error && 'data' in res.error) {
                setErrorMessage(res.error.data?.message || 'Произошла ошибка');
            } else {
                console.log('22333')
                refetchMe().then((res) => {
                    console.log(res)
                    dispatch(setProfileInfo(res.data.data));
                });
                onClose();
            }
        } catch (error) {
            console.error('Ошибка при обновлении аватара:', error);
        }
    };

    const handleSelectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled && result.assets[0].uri) {
            const selectedUri = result.assets[0].uri;

            try {
                const base64String = await FileSystem.readAsStringAsync(selectedUri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                setSelectedImage(selectedUri);
                setBase64String(base64String);
            } catch (error) {
                console.error("Error reading file:", error);
                setErrorMessage("Failed to read the selected image.");
            }
        }
    };
    

    return (
        <View className="absolute top-[40%] -translate-y-[50%] w-[90%] max-w-[400px] bg-[#252525] rounded-[20px] overflow-hidden z-10">
            <View className="p-4 w-full h-full">
                <Text className="text-base font-normal text-dark-callsBarCallNameColor">Edit photo</Text>
                <View className="w-full flex justify-center items-center mt-5">
                    <TouchableOpacity onPress={handleSelectImage}>
                        <Image
                            source={selectedImage ? { uri: selectedImage } : require('../../../assets/image/user.png')}
                            className="w-32 h-32 rounded-full"
                        />
                    </TouchableOpacity>
                    {errorMessage && (
                        <Text className="text-center text-[#f8717c] mt-2">{errorMessage}</Text>
                    )}
                </View>
                <View className="mt-5 flex-row justify-end">
                    <Pressable
                        onPress={onClose}
                        className="px-4 py-2 rounded-[20px]"
                    >
                        <Text className="text-dark-callsBarCallDateColor">Cancel</Text>
                    </Pressable>
                    <Pressable
                        onPress={handleSubmit(onSubmit)}
                        className="ml-2 bg-dark-createModalHoverColorButton px-4 py-2 rounded-[20px]"
                    >
                        <Text className="text-dark-callsBarCallDateColor">Save</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}