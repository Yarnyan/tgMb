import React, { useRef } from 'react';
import { StyleSheet, View, PanResponder } from 'react-native';
import ChatsBar from '@/modules/chats/chats';
import Header from '@/modules/header/Header';
import SideBar from '@/modules/sideBar/SideBar';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { toggleHeader } from '@/store/reducers/headerSlice';

const ChatsPage = () => {
    const dispatch = useAppDispatch();
    const isActive = useAppSelector((state) => state.header.isActive);
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return Math.abs(gestureState.dx) > 20;
            },
            onPanResponderEnd: (evt, gestureState) => {
                if (gestureState.dx > 0) {
                    dispatch(toggleHeader());
                }
            },
            onPanResponderGrant: (evt, gestureState) => {
                console.log('2')
            },
        })
    ).current;

    return (
        <View className='h-full' {...panResponder.panHandlers}>
            <Header />
            <ChatsBar />
            {isActive && <SideBar />}
        </View>
    );
}

export default ChatsPage;