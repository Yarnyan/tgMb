import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { useAppDispatch } from '../../../../hooks/redux';
import { useCreateGroupMutation } from '../../../../store/api/Group';
import { setNewGroup } from '../../../../store/reducers/createSlice';
import { nextStep } from '../../../../store/reducers/stepsSlice';

type Props = {
    onClose: () => void;
};

type FormData = {
    name: string;
};

const CreateGroupModal = ({ onClose }: Props) => {
    const dispatch = useAppDispatch();
    const [image, setImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [createGroup] = useCreateGroupMutation();

    const methods = useForm<FormData>({
        defaultValues: {
            name: '',
        },
    });

    const { control, handleSubmit } = methods;

    const onSubmit = async (data: FormData) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            if (uploading) {
                formData.append('file', {
                    uri: uploading.uri,
                    name: uploading.uri.split('/').pop(),
                    type: 'image/jpeg',
                });
            }

            const res = await createGroup(formData);
            if (res.error && 'data' in res.error) {
                setErrorMessage(res.error.data?.message);
            } else {
                dispatch(setNewGroup(res.data.data));
                dispatch(nextStep());
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled && result.assets) {
            const selectedAsset = result.assets[0];
            setImage(selectedAsset.uri);
            setUploading(selectedAsset);
        }
    };

    return (
        <FormProvider {...methods}>
            <View className="w-full p-4">
                <Text className="text-lg font-medium text-dark-storiesBarMenuTextColor">Create group</Text>
                <View className="mt-4 flex items-center justify-center w-full">
                    <TouchableOpacity
                        className="w-[100px] h-[100px] rounded-full border-dashed border-2 border-[#AEAEAE] flex items-center justify-center"
                        onPress={handleImagePick}
                    >
                        {image ? (
                            <Image source={{ uri: image }} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <Text className="text-dark-iconsColor">Add Photo</Text>
                        )}
                    </TouchableOpacity>
                </View>
                <View>
                    <Text className="text-sm font-medium text-dark-callsBarCallDateColor mt-4">Group name</Text>
                    <Controller
                        control={control}
                        name="name"
                        rules={{
                            required: 'Group name is required',
                        }}
                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                            <>
                                <TextInput
                                    className="mt-2 h-12 w-full rounded-[20px] p-4 bg-dark-chatsBarItemColor text-dark-callsBarCallNameColor"
                                    placeholder="Title..."
                                    placeholderTextColor={'#8F8F8F'}
                                    value={value}
                                    onChangeText={onChange}
                                />
                                {error && (
                                    <Text className="text-[#f8717c] mt-2">{error.message}</Text>
                                )}
                            </>
                        )}
                    />
                    {errorMessage && (
                        <Text className="text-center text-[#f8717c] mt-2">{errorMessage}</Text>
                    )}
                </View>
                <View className="mt-4 flex flex-row justify-end">
                    <TouchableOpacity
                        className="p-4 hover:bg-dark-createModalHoverColorButton rounded-[20px] mr-2 duration-500"
                        onPress={onClose}
                    >
                        <Text className="text-dark-createModalTextColorButton font-semibold text-sm">Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="p-4 hover:bg-dark-createModalHoverColorButton rounded-[20px] ml-2 duration-500"
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text className="text-dark-createModalTextColorButton font-semibold text-sm">Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </FormProvider>
    );
};

export default CreateGroupModal;