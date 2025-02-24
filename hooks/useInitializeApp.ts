import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "./redux";
import { setActiveChat } from "../store/reducers/chatSlice";
import { setProfileInfo } from "../store/reducers/profileSlice";
import { useGetMeQuery } from "../store/api/User";
import { useNavigation } from "expo-router";


export async function loadActiveChat() {
  const chat = await AsyncStorage.getItem("activeChat");
  return chat ? JSON.parse(chat) : null;
}

export async function saveActiveChat(chat: any) {
  await AsyncStorage.setItem("activeChat", JSON.stringify(chat));
}

export async function saveTheme(theme: string) {
  await AsyncStorage.setItem("theme", theme);
}

export async function saveProfile(profile: any) {
  await AsyncStorage.setItem("profile", JSON.stringify(profile));
}

export function useInitializeApp() {
  const dispatch = useAppDispatch();
  const token = AsyncStorage.getItem("token"); // Note: This is async, so handle it properly.
  const location = useNavigation();
  const { data, isLoading, isError, refetch: refetchMe } = useGetMeQuery(null, {
    skip: !token,
  });

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const activeChat = await loadActiveChat(); // Load active chat
        if (activeChat) {
          dispatch(setActiveChat(activeChat));
        }

        await saveTheme("dark"); // Save theme

        if (token && data?.data) {
          await saveProfile(data.data); // Save profile
          dispatch(setProfileInfo(data.data));
        }
      } catch (error) {
        console.error("Error initializing app:", error);
      }
    };

    if (data || isError) {
      initializeApp(); // Call initialization function
    }
  }, [location, data, dispatch, token, isError]);

  return { isLoading, isError };
}