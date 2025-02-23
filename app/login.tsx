import React from 'react';
import { StyleSheet, View } from 'react-native';
import Login from '@/modules/login/components/Login';

const LoginPage = () => {
    return (
        <View className='flex h-full items-center justify-center'>
            <Login />
        </View>
    );
}

export default LoginPage;
