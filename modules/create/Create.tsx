import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Modal, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import GroupWrapper from './modal/group/GroupWrapper';
import ChannelWrapper from './modal/Channel/ChannelWrapper';
import { clearSteps } from '@/store/reducers/stepsSlice';
import { useAppDispatch } from '@/hooks/redux';

type Props = {
};

export default function CreateBar({ }: Props) {

    const [activeTab, setActiveTab] = useState<'Team' | 'Channels' | 'Groups' | null>(null);
    const dispatch = useAppDispatch();
    const [groupModalVisible, setGroupModalVisible] = useState<boolean>(false);
    const [channelModalVisible, setChannelModalVisible] = useState<boolean>(false);

    return (
        <View className="h-full bg-dark-chatsBarColor">
            <View className='bg-dark-activeTab w-full h-[100px] px-[16px] flex flex-col justify-between pb-[12px]'>
                <View className='flex flex-row justify-between mt-[50px]'>
                    <View className='w-full flex flex-row items-center'>
                        <View>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="chevron-back" size={30} color="#AEAEAE" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text className='text-[20px] font-medium text-dark-storiesBarMenuTextColor ml-[12px]'>Create</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View className="w-full h-full">
                <View className="flex flex-col w-full">
                    <TouchableOpacity onPress={() => { setGroupModalVisible(true) }} className={`px-4 cursor-pointer h-[48px] flex items-center flex-row ${activeTab === "Groups" ? 'bg-dark-callsCalendarActiveDayColor' : ''}`}>
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <Path d="M9.75845 10.87C9.65845 10.86 9.53845 10.86 9.42845 10.87C7.04845 10.79 5.15845 8.84 5.15845 6.44C5.15845 3.99 7.13845 2 9.59845 2C12.0484 2 14.0384 3.99 14.0384 6.44C14.0284 8.84 12.1384 10.79 9.75845 10.87Z" stroke="#AEAEAE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M4.75836 14.56C2.33836 16.18 2.33836 18.82 4.75836 20.43C7.50836 22.27 12.0184 22.27 14.7684 20.43C17.1884 18.81 17.1884 16.17 14.7684 14.56C12.0284 12.73 7.51836 12.73 4.75836 14.56Z" stroke="#AEAEAE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M16.3534 4C18.2934 4 19.8534 5.57 19.8534 7.5C19.8534 9.39 18.3534 10.93 16.4834 11C16.4034 10.99 16.3134 10.99 16.2234 11" stroke="#AEAEAE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M18.2834 20C19.0034 19.85 19.6834 19.56 20.2434 19.13C21.8034 17.96 21.8034 16.03 20.2434 14.86C19.6934 14.44 19.0234 14.16 18.3134 14" stroke="#AEAEAE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </Svg>

                        <Text className="text-dark-storiesBarMenuTextColor text-[14px] font-medium ml-4">New group</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setChannelModalVisible(true) }} className={`px-4 cursor-pointer h-[48px] flex items-center flex-row ${activeTab === "Channels" ? 'bg-dark-callsCalendarActiveDayColor' : ''}`}>
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <Path d="M6 9.85999V14.15" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M9 8.42999V15.57" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M12 7V17" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M15 8.42999V15.57" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M18 9.85999V14.15" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="white" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </Svg>

                        <Text className="text-dark-storiesBarMenuTextColor text-[14px] font-medium ml-4">New channel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }} className={`px-4 cursor-pointer h-[48px] flex items-center flex-row ${activeTab === "Team" ? 'bg-[var(--callsCalendarActiveDayColor)]' : ''}`}>
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <Path d="M14.7363 18.05C14.6464 17.0552 14.114 16.1458 13.2994 15.5947C13.5064 15.0845 13.5899 14.5279 13.537 13.9712C13.4558 13.117 13.0592 12.3237 12.4245 11.7461C11.7899 11.1686 10.9628 10.8482 10.1047 10.8477C9.5468 10.8473 9.00182 10.9821 8.51415 11.235C8.11351 10.7123 7.58854 10.2915 6.9814 10.0143C6.40344 9.75048 5.77592 9.6282 5.14982 9.65136V5.60003C5.14982 4.84416 5.45008 4.11926 5.98456 3.58478C6.51904 3.0503 7.24395 2.75003 7.99982 2.75003H17.5998C18.3557 2.75003 19.0806 3.0503 19.6151 3.58478C20.1496 4.11925 20.4498 4.84416 20.4498 5.60003V15.2C20.4498 15.9559 20.1496 16.6808 19.6151 17.2153C19.0806 17.7498 18.3557 18.05 17.5998 18.05H14.7363ZM5.81644 14.9473C5.65265 15.0151 5.4771 15.05 5.29982 15.05C4.94177 15.05 4.5984 14.9078 4.34522 14.6546C4.09205 14.4015 3.94982 14.0581 3.94982 13.7C3.94982 13.342 4.09205 12.9986 4.34522 12.7454C4.5984 12.4923 4.94177 12.35 5.29982 12.35C5.4771 12.35 5.65265 12.3849 5.81644 12.4528C5.98023 12.5206 6.12905 12.6201 6.25441 12.7454C6.37977 12.8708 6.47921 13.0196 6.54706 13.1834C6.6149 13.3472 6.64982 13.5227 6.64982 13.7C6.64982 13.8773 6.6149 14.0529 6.54706 14.2167C6.47921 14.3804 6.37977 14.5293 6.25441 14.6546C6.12905 14.78 5.98023 14.8794 5.81644 14.9473ZM8.44982 18.5756C8.44982 19.0254 8.27724 19.4668 7.87787 19.8069C7.47156 20.153 6.76217 20.45 5.59982 20.45C4.43678 20.45 3.72745 20.1538 3.32142 19.8084C2.92273 19.4693 2.74982 19.0282 2.74982 18.5756C2.74982 18.1051 3.11981 17.75 3.54302 17.75H7.65662C8.07982 17.75 8.44982 18.1051 8.44982 18.5756ZM10.6313 14.8304C10.4907 14.971 10.2999 15.05 10.101 15.05C9.9021 15.05 9.71134 14.971 9.57069 14.8304C9.43003 14.6897 9.35102 14.4989 9.35102 14.3C9.35102 14.1011 9.43003 13.9104 9.57069 13.7697C9.71134 13.629 9.9021 13.55 10.101 13.55C10.2999 13.55 10.4907 13.629 10.6313 13.7697C10.772 13.9104 10.851 14.1011 10.851 14.3C10.851 14.4989 10.772 14.6897 10.6313 14.8304Z" stroke="#AEAEAE" stroke-width="1.5" />
                        </Svg>
                        <Text className="text-dark-storiesBarMenuTextColor text-[14px] font-medium ml-4">Team</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {
                groupModalVisible &&
                <Modal transparent={true}
                    animationType="slide"
                    onRequestClose={() => {
                        console.log("Групповое модальное окно закрыто");
                        setGroupModalVisible(false);
                        dispatch(clearSteps())
                    }}
                >
                    <View style={styles.modalBackground}>
                        <GroupWrapper onClose={() => setGroupModalVisible(false)} />
                    </View>
                </Modal>
            }
            {
                channelModalVisible &&
                <Modal transparent={true}
                    animationType="slide"
                    onRequestClose={() => {
                        console.log("Модальное окно канала закрыто");
                        setChannelModalVisible(false);
                        dispatch(clearSteps())
                    }}
                >
                    <View style={styles.modalBackground}>
                        <ChannelWrapper onClose={() => setChannelModalVisible(false)} />
                    </View>
                </Modal>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});