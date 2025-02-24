import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loader = () => {
  return (
    <View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)] z-50 absolute top-0 left-0 right-0 bottom-0">
      <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
  );
};

export default Loader;
