import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, PanResponder, Animated } from 'react-native';
import ChatsBar from '@/modules/chats/chats';
import Header from '@/modules/header/Header';
import SideBar from '@/modules/sideBar/SideBar';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { toggleHeader } from '@/store/reducers/headerSlice';

const ChatsPage = () => {
    const dispatch = useAppDispatch();
    const isActive = useAppSelector((state) => state.header.isActive);

    const sideBarAnimation = useRef(new Animated.Value(-300)).current;

    useEffect(() => {
        if (isActive) {
            Animated.spring(sideBarAnimation, {
                toValue: 0,
                useNativeDriver: true,
                speed: 5,
                bounciness: 5
            }).start();
        } else {
            Animated.spring(sideBarAnimation, {
                toValue: -300,
                useNativeDriver: true,
                speed: 5,
                bounciness: 5
            }).start();
        }
    }, [isActive]);

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
            <Animated.View 
                style={[
                    styles.sideBarContainer,
                    {
                        transform: [
                            { translateX: sideBarAnimation }
                        ]
                    }
                ]}
            >
                {isActive && <SideBar />}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    sideBarContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: 300,
        zIndex: 100
    }
});

export default ChatsPage;