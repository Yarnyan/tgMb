import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Switch, ScrollView, TouchableWithoutFeedback } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { logOut, toggleHeader } from '@/store/reducers/headerSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef<View | null>(null);
    const dispatch = useAppDispatch();
    const profile = useAppSelector((state) => state.profile.profile);
    return (
        <View className='absolute z-50 w-full h-full'>
            <View className='w-full h-full flex flex flex-row'>
                <View ref={sidebarRef} className={`w-[380px] sm:h-[100dvh] fixed z-50 top-0 left-0 h-full transform transition-transform duration-300 w-64 bg-dark-activeTab shadow-lg z-20 px-[20px] py-[16px]`}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View className='h-[102px] flex items-center bg-[var(--chatsBarButtonColor)] rounded-[20px] p-[16px]'>
                            <Image source={profile.avatar ? { uri: 'http://192.168.0.5:5199/' + profile.avatar } : require('../../assets/image/user.png')} className='w-[120px] h-[120px] rounded-full' />
                            <View className='ml-[16px]'>
                                <Text className='text-[16px] font-medium text-dark-callsBarCallNameColor text-center'>{profile?.username}</Text>
                                <Text className='text-[12px] font-normal text-dark-callsBarCallDateColor'>UI & UX designer</Text>
                            </View>
                        </View>
                        <View className='flex flex-col mt-[100px]'>
                            <Link href={'/profile'}>
                                <View className='flex h-[48px] justify-between flex-row w-full'>
                                    <View className='flex flex-row'>
                                        <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
                                            <Path d="M13.1034 10.87C13.0034 10.86 12.8834 10.86 12.7734 10.87C10.3934 10.79 8.50342 8.84 8.50342 6.44C8.50342 3.99 10.4834 2 12.9434 2C15.3934 2 17.3834 3.99 17.3834 6.44C17.3734 8.84 15.4834 10.79 13.1034 10.87Z" stroke="#AEAEAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <Path d="M8.10333 14.56C5.68333 16.18 5.68333 18.82 8.10333 20.43C10.8533 22.27 15.3633 22.27 18.1133 20.43C20.5333 18.81 20.5333 16.17 18.1133 14.56C15.3733 12.73 10.8633 12.73 8.10333 14.56Z" stroke="#AEAEAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </Svg>
                                        <Text className='text-[16px] font-medium text-dark-callsBarCallNameColor ml-[12px]'>Profile</Text>
                                    </View>
                                    <View className='flex justify-center items-center bg-dark-chatsBarButtonColor rounded-[20px] w-[46px] h-[22px]'>
                                        <Text className='text-dark-callsBarCallDateColor text-[12px] font-normal'>Free</Text>
                                    </View>
                                </View>
                            </Link>
                            <View className='h-[48px] flex'>
                                <Link href={'/'} onPress={() => dispatch(toggleHeader())}>
                                    <View className='flex flex-row'>
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <Path d="M12.8334 5.88H5.05334C3.34334 5.88 1.94336 7.27999 1.94336 8.98999V20.35C1.94336 21.8 2.98336 22.42 4.25336 21.71L8.18335 19.52C8.60335 19.29 9.28336 19.29 9.69336 19.52L13.6234 21.71C14.8934 22.42 15.9333 21.8 15.9333 20.35V8.98999C15.9433 7.27999 14.5434 5.88 12.8334 5.88Z" stroke="#AEAEAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <Path d="M15.9434 8.98999V20.35C15.9434 21.8 14.9034 22.41 13.6334 21.71L9.70337 19.52C9.28337 19.29 8.60335 19.29 8.18335 19.52L4.25336 21.71C2.98336 22.41 1.94336 21.8 1.94336 20.35V8.98999C1.94336 7.27999 3.34334 5.88 5.05334 5.88H12.8334C14.5434 5.88 15.9434 7.27999 15.9434 8.98999Z" stroke="#AEAEAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <Path d="M21.9434 5.10999V16.47C21.9434 17.92 20.9034 18.53 19.6334 17.83L15.9434 15.77V8.98999C15.9434 7.27999 14.5434 5.88 12.8334 5.88H7.94336V5.10999C7.94336 3.39999 9.34334 2 11.0533 2H18.8334C20.5434 2 21.9434 3.39999 21.9434 5.10999Z" stroke="#AEAEAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </Svg>
                                        <Text className='text-[16px] font-medium text-dark-callsBarCallNameColor ml-[12px]'>Saved Message</Text>
                                    </View>
                                </Link>
                            </View>
                            <View className='h-[48px] flex'>
                                <Link href={'/contacts'} className='flex flex-row' onPress={() => dispatch(toggleHeader())}>
                                    <View className='flex flex-row'>
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <Path d="M9.75845 10.87C9.65845 10.86 9.53845 10.86 9.42845 10.87C7.04845 10.79 5.15845 8.84 5.15845 6.44C5.15845 3.99 7.13845 2 9.59845 2C12.0484 2 14.0384 3.99 14.0384 6.44C14.0284 8.84 12.1384 10.79 9.75845 10.87Z" stroke="#AEAEAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <Path d="M4.75836 14.56C2.33836 16.18 2.33836 18.82 4.75836 20.43 C7.50836 22.27 12.0184 22.27 14.7684 20.43C17.1884 18.81 17.1884 16.17 14.7684 14.56C12.0284 12.73 7.51836 12.73 4.75836 14.56Z" stroke="#AEAEAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <Path d="M16.3534 4C18.2934 4 19.8534 5.57 19.8534 7.5C19.8534 9.39 18.3534 10.93 16.4834 11C16.4034 10.99 16.3134 10.99 16.2234 11" stroke="#AEAEAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <Path d="M18.2834 20C19.0034 19.85 19.6834 19.56 20.2434 19.13C21.8034 17.96 21.8034 16.03 20.2434 14.86C19.6934 14.44 19.0234 14.16 18.3134 14" stroke="#AEAEAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </Svg>
                                        <Text className='text-[16px] font-medium text-dark-callsBarCallNameColor ml-[12px]'>Contacts</Text>
                                    </View>
                                </Link>
                            </View>
                            <View className='h-[48px] flex'>
                                <Link href={'/stories'} className='flex flex-row' onPress={() => dispatch(toggleHeader())}>
                                    <View className='flex flex-row'>
                                        <Svg width="24" height="24" viewBox="0 0 16 24" fill="none">
                                            <Path d="M12.8 0.9H3.2C2.59292 0.9 2.009 1.11915 1.5771 1.51179C1.14488 1.90472 0.9 2.4398 0.9 3V19C0.9 19.5602 1.14488 20.0953 1.5771 20.4882C2.009 20.8808 2.59292 21.1 3.2 21.1H12.8C13.4071 21.1 13.991 20.8808 14.4229 20.4882C14.8551 20.0953 15.1 19.5602 15.1 19V3C15.1 2.4398 14.8551 1.90472 14.4229 1.51179C13.991 1.11915 13.4071 0.9 12.8 0.9ZM13.7 19C13.7 19.2113 13.6077 19.4162 13.4398 19.5688C13.2716 19.7218 13.0416 19.8091 12.8 19.8091H3.2C2.95839 19.8091 2.72837 19.7218 2.56016 19.5688C2.39227 19.4162 2.3 19.2113 2.3 19V3C2.3 2.78866 2.39227 2.5838 2.56016 2.43117C2.72837 2.27825 2.95839 2.19091 3.2 2.19091H12.8C13.0416 2.19091 13.2716 2.27825 13.4398 2.43117C13.6077 2.5838 13.7 2.78866 13.7 3V19ZM8.91205 5.38247C9.03411 5.21639 9.1 5.02001 9.1 4.81818C9.1 4.54731 8.98155 4.28971 8.77438 4.10136C8.56751 3.91331 8.28883 3.80909 8 3.80909C7.78445 3.80909 7.57306 3.86716 7.39251 3.97683C7.2119 4.08655 7.06959 4.24344 6.98512 4.42883C6.90058 4.61437 6.87826 4.81919 6.92153 5.01691C6.96476 5.21452 7.07119 5.3946 7.22563 5.535C7.37997 5.67531 7.57551 5.76995 7.78712 5.80821C7.9987 5.84647 8.21811 5.8269 8.41792 5.75166C8.61777 5.6764 8.79008 5.54841 8.91205 5.38247Z" fill="#AEAEAE" stroke="#AEAEAE" stroke-width="0.2" />
                                        </Svg>
                                        <Text className='text-[16px] font-medium text-dark-callsBarCallNameColor ml-[12px]'>Stories</Text>
                                    </View>
                                </Link>
                            </View>
                            <View className='h-[48px] flex'>
                                <Link href={'/calls'} className='flex flex-row' onPress={() => dispatch(toggleHeader())}>
                                    <View className='flex flex-row'>
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <Path d="M22.9135 18.33C22.9135 18.69 22.8335 19.06 22.6635 19.42C22.4935 19.78 22.2735 20.12 21.9835 20.44C21.4935 20.98 20.9535 21.37 20.3435 21.62C19.7435 21.87 19.0935 22 18.3935 22C17.3735 22 16.2835 21.76 15.1335 21.27C13.9835 20.78 12.8335 20.12 11.6935 19.29C10.5435 18.45 9.45348 17.52 8.41348 16.49C7.38348 15.45 6.45348 14.36 5.62348 13.22C4.80348 12.08 4.14348 10.94 3.66348 9.81C3.18348 8.67 2.94348 7.58 2.94348 6.54C2.94348 5.86 3.06348 5.21 3.30348 4.61C3.54348 4 3.92348 3.44 4.45348 2.94C5.09348 2.31 5.79348 2 6.53348 2C6.81348 2 7.09348 2.06 7.34348 2.18C7.60348 2.3 7.83348 2.48 8.01348 2.74L10.3335 6.01C10.5135 6.26 10.6435 6.49 10.7335 6.71C10.8235 6.92 10.8735 7.13 10.8735 7.32C10.8735 7.56 10.8035 7.8 10.6635 8.03C10.5335 8.26 10.3435 8.5 10.1035 8.74L9.34348 9.53C9.23348 9.64 9.18348 9.77 9.18348 9.93C9.18348 10.01 9.21348 9.93 9.23348 10.01C9.26348 10.09 9.27348 10.3 9.29348 10.36C9.47348 10.69 9.78348 11.12 10.2235 11.64C10.6735 12.16 11.1535 12.69 11.6735 13.22C12.2135 13.75 12.7335 14.24 13.2635 14.69C13.7835 15.13 14.2135 15.43 14.5535 15.61C14.6035 15.63 14.6635 15.66 14.7335 15.69C14.8135 15.72 14.8935 15.73 14.9835 15.73C15.1535 15.73 15.2835 15.67 15.3935 15.56L16.1535 14.81C16.4035 14.56 16.6435 14.37 16.8735 14.25C17.1035 14.11 17.3335 14.04 17.5835 14.04C17.7735 14.04 17.9735 14.08 18.1935 14.17C18.4135 14.26 18.6435 14.39 18.8935 14.56L22.2035 16.91C22.4635 17.09 22.6435 17.3 22.7535 17.55C22.8535 17.8 22.9135 18.05 22.9135 18.33Z" stroke="#AEAEAE" stroke-width="1.5" stroke-miterlimit="10" />
                                        </Svg>

                                        <Text className='text-[16px] font-medium text-dark-callsBarCallNameColor ml-[12px]'>Calls</Text>
                                    </View>
                                </Link>
                            </View>
                            <View className='h-[48px] flex'>
                                <Link href='/new' className='flex flex-row' onPress={() => dispatch(toggleHeader())}>
                                    <View className='flex flex-row'>
                                        <MaterialIcons name="create" size={24} color="#AEAEAE" />
                                        <Text className='text-[16px] font-medium text-dark-callsBarCallNameColor ml-[12px]'>Create</Text>
                                    </View>
                                </Link>
                            </View>
                            <View className='h-[48px] flex'>
                                <Link href='/settings' className='flex flex-row' onPress={() => dispatch(toggleHeader())}>
                                    <View className='flex flex-row'>
                                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <Path d="M3 9.10998V14.88C3 17 3 17 5 18.35L10.5 21.53C11.33 22.01 12.68 22.01 13.5 21.53L19 18.35C21 17 21 17 21 14.89V9.10998C21 6.99998 21 6.99999 19 5.64999L13.5 2.46999C12.68 1.98999 11.33 1.98999 10.5 2.46999L5 5.64999C3 6.99999 3 6.99998 3 9.10998Z" stroke="#AEAEAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <Path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#AEAEAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </Svg>
                                        <Text className='text-[16px] font-medium text-dark-callsBarCallNameColor ml-[12px]'>Settings & Privacy</Text>
                                    </View>
                                </Link>
                            </View>
                            <View className='flex flex-row justify-between items-center h-[48px] mt-[-14px]'>
                                <View className='flex flex-row'>
                                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <Path d="M2.02997 12.42C2.38997 17.57 6.75997 21.76 11.99 21.99C15.68 22.15 18.98 20.43 20.96 17.72C21.78 16.61 21.34 15.87 19.97 16.12C19.3 16.24 18.61 16.29 17.89 16.26C13 16.06 8.99997 11.97 8.97997 7.13996C8.96997 5.83996 9.23997 4.60996 9.72997 3.48996C10.27 2.24996 9.61997 1.65996 8.36997 2.18996C4.40997 3.85996 1.69997 7.84996 2.02997 12.42Z" stroke="#AEAEAE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </Svg>
                                    <Text className='text-[16px] font-medium text-dark-callsBarCallNameColor ml-[12px]'>Night mode</Text>
                                </View>
                                <View className='flex flex-row'>
                                    <Switch />
                                </View>
                            </View>
                        </View>
                        <View className="mt-[16px]">
                            <TouchableOpacity className='flex flex-row items-center justify-center rounded-[20px] bg-dark-createModalHoverColorButton w-full h-[48px]' onPress={() => dispatch(logOut())}>
                                <MaterialCommunityIcons name="logout" size={24} color="#AEAEAE" />
                                <Text className='text-[16px] font-medium text-dark-callsBarCallNameColor ml-[8px]'>Log out</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
                <TouchableWithoutFeedback onPress={() => dispatch(toggleHeader())}>
                    <View className="h-full w-full bg-dark-asideColor opacity-90" />
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}

export default SideBar;