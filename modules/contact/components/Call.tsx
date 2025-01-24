import React from 'react';
import { View, Text, Image } from 'react-native';
import { IContact } from '../types/types';

type Props = {
    contact: IContact;
}

export default function Contact({ contact }: Props) {
    return (
        <View className='w-full flex flex-row justify-between items-center px-[16px] py-[12px]'>
            <View className='flex flex-row items-center'>
                <Image 
                    source={contact.src} 
                    alt="" 
                    className='rounded-full w-[42px] h-[52px]' 
                />
                <View className='ml-[14px] flex flex-col'>
                    <Text className='text-[16px] font-medium text-dark-callsBarCallNameColor'>{contact.name}</Text>
                    <Text className='text-[12px] font-normal text-dark-callsBarCallDateColor'>{contact.last}</Text>
                </View>
            </View>
        </View>
    );
}