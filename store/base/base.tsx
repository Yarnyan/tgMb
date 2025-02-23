import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
const customBaseQuery = (baseUrl: string) => fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set("ngrok-skip-browser-warning", "*");
    headers.set('Accept', '*/*');

    return headers;
  },
});

export const baseQueryWithReauth = (baseUrl: string) => async (args: any, api: any, extraOptions: any) => {
  let result = await customBaseQuery(baseUrl)(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const userId = await AsyncStorage.getItem('userId');
    const accessToken = await AsyncStorage.getItem('token');
    const refreshToken = await AsyncStorage.getItem('refreshToken');

    const body = {
      userId: userId ? parseInt(userId, 10) : 0,
      accessToken: accessToken || '',
      refreshToken: refreshToken || '',
    };

    const refreshResult = await customBaseQuery(baseUrl)({
      url: 'auth/refresh-token',
      method: 'POST',
      body,
    }, api, extraOptions);

    if (refreshResult.data) {
      const newToken = refreshResult.data.accessToken;
      const newRefreshToken = refreshResult.data.refreshToken;

      await AsyncStorage.setItem('token', newToken);
      await AsyncStorage.setItem('refreshToken', newRefreshToken);

      result = await customBaseQuery(baseUrl)(args, api, extraOptions);
    } else {
      await AsyncStorage.clear();
      router.push('/login');
    }
  }

  return result;
};