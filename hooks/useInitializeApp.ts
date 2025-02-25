import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "./redux";
import { setActiveChat } from "../store/reducers/chatSlice";
import { setProfileInfo } from "../store/reducers/profileSlice";
import { useGetMeQuery } from "../store/api/User";
import { usePathname } from "expo-router";

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
  const token = AsyncStorage.getItem("token");
  const pathname = usePathname();
  const { data, isLoading, isError, refetch: refetchMe } = useGetMeQuery(null, {
    skip: !token,
  });
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const activeChat = await loadActiveChat();
        if (activeChat) {
          dispatch(setActiveChat(activeChat));
        }

        await saveTheme("dark");

        if (token && data?.data) {
          await saveProfile(data.data);
          dispatch(setProfileInfo(data.data));
        }
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        setInitialized(true);
      }
    };

    if (!initialized && (data || isError)) {
      initializeApp();
    }
  }, [pathname, data, dispatch, token, isError, initialized]);

  return { isLoading, isError, initialized };
}
