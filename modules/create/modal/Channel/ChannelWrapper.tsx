import React from 'react';
import { StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import { useAppSelector } from '../../../../hooks/redux';
import CreateChannelModal from './CreateChannelModal';

type Props = {
    onClose: () => void;
};

const ChannelWrapper = ({ onClose }: Props) => {
    const step = useAppSelector((state) => state.step.currentStep);

    const renderModal = (step: number) => {
        switch (step) {
            case 1:
                return <CreateChannelModal onClose={onClose} />;
            default:
                return null;
        }
    };

    return (
        <View className='absolute top-[30%] -translate-y-[50%] w-[90%] max-w-[400px] bg-[#202020] rounded-[20px] overflow-hidden z-10'>
            {renderModal(step)}
        </View>
    );
};


export default ChannelWrapper;