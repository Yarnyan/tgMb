import { useEffect } from 'react';
import { useAppDispatch } from './redux';
import { useGetMeQuery } from '@/store/api/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setProfileInfo } from '@/store/reducers/profileSlice';
import { usePathname } from 'expo-router';

const useProfileLoader = () => {
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const { data, error, isLoading, refetch } = useGetMeQuery(null, {
        skip: pathname === '/login' || pathname === '/reg', // Пропустить запрос на /login и /reg
    });

    useEffect(() => {
        if (data) {
            // Сохранение данных в AsyncStorage
            AsyncStorage.setItem('profile', JSON.stringify(data.data))
                .then(() => {
                    dispatch(setProfileInfo(data.data));
                })
                .catch((err) => {
                    console.error('Ошибка при сохранении профиля в AsyncStorage:', err);
                });
        }
    }, [data, dispatch]);

    useEffect(() => {
        // Перезапрос данных при изменении pathname
        if (pathname !== '/login' && pathname !== '/reg') {
            refetch();
        }
    }, [pathname, refetch]);

    return { isLoading, error };
};

export default useProfileLoader;