import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ICall } from '../types/types';
import { MediaType } from '../types/types';
import Svg, { Path } from 'react-native-svg';

type Props = {
    call: ICall;
}

export default function Call({ call }: Props) {
    return (
        <View className='w-full flex flex-row justify-between items-center px-[16px] py-[12px]'>
            <View className='flex flex-row items-center'>
                <Image
                    source={{ uri: call.src }}
                    alt=""
                    className='rounded-full w-[50px] h-[50px]'
                />
                <View className='ml-[14px] flex flex-col'>
                    <Text className='text-[16px] font-medium text-dark-callsBarCallNameColor'>{call.name}</Text>
                    <Text className='text-[12px] font-normal text-dark-callsBarCallDateColor mt-[8px]'>{call.date}</Text>
                </View>
            </View>
            <TouchableOpacity>
                {call.type === MediaType.Call ? <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <Path d="M22.9135 18.33C22.9135 18.69 22.8335 19.06 22.6635 19.42C22.4935 19.78 22.2735 20.12 21.9835 20.44C21.4935 20.98 20.9535 21.37 20.3435 21.62C19.7435 21.87 19.0935 22 18.3935 22C17.3735 22 16.2835 21.76 15.1335 21.27C13.9835 20.78 12.8335 20.12 11.6935 19.29C10.5435 18.45 9.45348 17.52 8.41348 16.49C7.38348 15.45 6.45348 14.36 5.62348 13.22C4.80348 12.08 4.14348 10.94 3.66348 9.81C3.18348 8.67 2.94348 7.58 2.94348 6.54C2.94348 5.86 3.06348 5.21 3.30348 4.61C3.54348 4 3.92348 3.44 4.45348 2.94C5.09348 2.31 5.79348 2 6.53348 2C6.81348 2 7.09348 2.06 7.34348 2.18C7.60348 2.3 7.83348 2.48 8.01348 2.74L10.3335 6.01C10.5135 6.26 10.6435 6.49 10.7335 6.71C10.8235 6.92 10.8735 7.13 10.8735 7.32C10.8735 7.56 10.8035 7.8 10.6635 8.03C10.5335 8.26 10.3435 8.5 10.1035 8.74L9.34348 9.53C9.23348 9.64 9.18348 9.77 9.18348 9.93C9.18348 10.01 9.21348 9.93 9.23348 10.01C9.26348 10.09 9.27348 10.3 9.29348 10.36C9.47348 10.69 9.78348 11.12 10.2235 11.64C10.6735 12.16 11.1535 12.69 11.6735 13.22C12.2135 13.75 12.7335 14.24 13.2635 14.69C13.7835 15.13 14.2135 15.43 14.5535 15.61C14.6035 15.63 14.6635 15.66 14.7335 15.69C14.8135 15.72 14.8935 15.73 14.9835 15.73C15.1535 15.73 15.2835 15.67 15.3935 15.56L16.1535 14.81C16.4035 14.56 16.6435 14.37 16.8735 14.25C17.1035 14.11 17.3335 14.04 17.5835 14.04C17.7735 14.04 17.9735 14.08 18.1935 14.17C18.4135 14.26 18.6435 14.39 18.8935 14.56L22.2035 16.91C22.4635 17.09 22.6435 17.3 22.7535 17.55C22.8535 17.8 22.9135 18.05 22.9135 18.33Z" stroke="#AEAEAE" stroke-width="1.5" stroke-miterlimit="10" />
                </Svg>
                    : <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path d="M12.6591 19H6.22762C3.01188 19 1.94336 17.1295 1.94336 15.25V7.75C1.94336 4.93527 3.01188 4 6.22762 4H12.6591C15.8748 4 16.9434 4.93527 16.9434 7.75V15.25C16.9434 18.0647 15.8647 19 12.6591 19Z" stroke="#AEAEAE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M19.52 17.1L16.74 15.15V8.84001L19.52 6.89001C20.88 5.94001 22 6.52001 22 8.19001V15.81C22 17.48 20.88 18.06 19.52 17.1Z" stroke="#AEAEAE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </Svg>
                }
            </TouchableOpacity>
        </View>
    );
}