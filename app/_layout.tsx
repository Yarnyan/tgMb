import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import useProfileLoader from '@/hooks/useProfileLoader';

import { useColorScheme } from '@/hooks/useColorScheme';
import StoreProvider from '@/helpers/StoreProvider';

SplashScreen.preventAutoHideAsync();

function AppInitializer() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const colorScheme = useColorScheme();

  const { isLoading, error } = useProfileLoader();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null; 
  }

  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="profile" options={{ headerShown: false }} />
          <Stack.Screen name="calls" options={{ headerShown: false }} />
          <Stack.Screen name="contacts" options={{ headerShown: false }} />
          <Stack.Screen name="storiesCreate" options={{ headerShown: false }} />
          <Stack.Screen name="storiesHistory" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="stories" options={{ headerShown: false }} />
          <Stack.Screen name="reg" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="chat" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
          <Stack.Screen name="editSettings" options={{ headerShown: false }} />
          <Stack.Screen name="new" options={{ headerShown: false }} />
          <Stack.Screen name="proxy" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
      <StatusBar style="auto" />
    </>
  );
}

export default function RootLayout() {
  return (
    <StoreProvider>
      <AppInitializer /> 
    </StoreProvider>
  );
}