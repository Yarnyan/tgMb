import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/redux';
import { setAllChats, setSearchUserForPhone } from '../../store/reducers/chatSlice';
import { useGetChatsQuery } from '../../store/api/Chat';
import { useGetUserByPhoneQuery, useGetUserByUsernameQuery } from '../../store/api/User';
import Loader from '../../components/ui/Loader';
import Chat from './components/chat';

const ChatsBar = () => {
    const [activeTab, setActiveTab] = useState<'All' | 'Channels' | 'Groups'>('All');
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState<any>(null);
    const [lastSearchValue, setLastSearchValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const sanitizePhoneNumber = (phoneNumber: string): string => {
        return phoneNumber.replace(/[+\-\s]/g, '');
    };

    const { control, handleSubmit, watch } = useForm();

    const isPhoneSearch = /^[\d+]/.test(lastSearchValue);
    const sanitizedPhone = isPhoneSearch ? sanitizePhoneNumber(lastSearchValue) : '';

    const { data: userByPhone, refetch: refetchUserByPhone } = useGetUserByPhoneQuery(
        sanitizedPhone,
        { skip: !isPhoneSearch || lastSearchValue.trim() === '' }
    );

    const { data: userByUsername, refetch: refetchUserByUsername } = useGetUserByUsernameQuery(
        lastSearchValue,
        { skip: isPhoneSearch || lastSearchValue.trim() === '' }
    );

    const { data: chats, refetch: refetchChats } = useGetChatsQuery(null);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setSearchResults(null);
            if (searchValue.trim().length > 0) {
                setLastSearchValue('');
                setTimeout(() => setLastSearchValue(`${searchValue}`), 0);
            } else {
                setLastSearchValue('');
                setSearchResults(null);
            }
            setIsLoading(false);
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [searchValue]);

    useEffect(() => {
        if (!lastSearchValue.trim() || lastSearchValue.trim().length === 0) {
            setSearchResults(null);
            return;
        }
        setIsLoading(true);
        if (isPhoneSearch) {
            dispatch(setSearchUserForPhone(sanitizedPhone));
            refetchUserByPhone()
                .then((res) => {
                    setSearchResults(res.data.data);
                })
                .catch(() => setSearchResults(null))
                .finally(() => setIsLoading(false));
        } else {
            refetchUserByUsername()
                .then((res) => {
                    setSearchResults(res.data.data);
                })
                .catch(() => setSearchResults(null))
                .finally(() => setIsLoading(false));
        }
    }, [lastSearchValue]);

    useEffect(() => {
        refetchChats();
        if (chats) {
            dispatch(setAllChats(chats.data));
        }
    }, [chats]);

    const displayData = searchValue.length === 0 ? chats?.data : searchResults;
    console.log(displayData)
    return (
        <View className="flex-1 bg-dark-chatsBarColor">
            <View className="px-[16px] flex bg-dark-asideColor py-[12px]">
                <Controller
                    name="search"
                    control={control}
                    render={({ field }) => (
                        <View className="flex-row items-center bg-dark-chatsBarItemColor rounded-[20px]">
                            <TextInput
                                {...field}
                                placeholder="Search..."
                                placeholderTextColor={'white'}
                                value={searchValue}  
                                onChangeText={(text) => setSearchValue(text)}  
                                className="flex-1 h-[46px] pl-[16px] text-dark-chatsBarTextColor rounded-l-[20px]"
                            />
                            <TouchableOpacity className="p-4 bg-dark-chatsBarItemColor)rounded-r-[20px]">
                                <Image source={require('../../assets/icons/SearchIcon.svg')} />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>

            <ScrollView horizontal={true} className="max-h-[90px]">
                <View className="flex-row gap-2 mt-[8px] pl-[16px] pb-4 h-[60px]">
                    {['All', 'Channels', 'Groups', 'Secrets'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab as 'All' | 'Channels' | 'Groups')}
                            className={`flex-row h-[50px] items-center px-[16px] py-[12px] rounded-[20px] ${activeTab === tab ? 'bg-dark-chatsBarActiveButtonColor' : 'bg-dark-chatsBarItemColor'
                                }`}
                        >
                            <Text
                                className={`text-[14px] font-medium ${activeTab === tab ? 'text-dark-chatsBarActiveButtonTextColor' : 'text-dark-chatsBarButtonTextColor'
                                    }`}
                            >
                                {tab}
                            </Text>
                            <Text
                                className={`ml-[8px] px-[7px] rounded-[30px] ${activeTab === tab
                                        ? 'text-dark-chatsBarActiveButtonTextColor bg-dark-chatsBarActiveContainerMessageColor'
                                        : 'text-dark-chatsBarButtonTextColor bg-dark-chatsBarContainerMessageColor'
                                    }`}
                            >
                                10
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <ScrollView>
                {!isLoading && displayData && displayData.length === 0 ? (
                    <Text className="text-center text-gray-500">Нет чатов</Text>
                ) : (
                    Array.isArray(displayData)
                        ? displayData.map((result: any) => <Chat key={result.id} chat={result} />)
                        : displayData && <Chat key={displayData?.id} chat={displayData} searchValue={searchValue} />
                )}
            </ScrollView>

            {isLoading && (
                <View className="absolute top-[140px] left-0 w-full h-full bg-dark-chatsBarColor flex justify-center items-center z-50">
                    <Loader />
                </View>
            )}
        </View>
    );
};

export default ChatsBar;
