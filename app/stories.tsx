import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Stories from '@/modules/stories/Stories';

const StoriesPage = () => {
    return (
        <View className='h-full'>
            <Stories />
        </View>
    );
}

export default StoriesPage;
