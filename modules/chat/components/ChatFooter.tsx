import React, { useRef, useState } from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useSendMessageMutation, useSendMessageChatMutation } from '../../../store/api/Chat';
import { useAppSelector } from '../../../hooks/redux';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type Props = {
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function ChatFooter({ setMessages }: Props) {
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');
  const { control, handleSubmit, setValue } = useForm();
  const [sendMessage] = useSendMessageMutation();
  const [sendMessageChat] = useSendMessageChatMutation();
  const activeChat = useAppSelector((state) => state.chat.activeChat);

  const handleFileButtonClick = () => {
    // Реализация выбора файла через react-native-image-picker или аналогичную библиотеку
    console.log('File picker not implemented yet');
  };

  const onSubmit = async (data: any) => {
    if (activeChat && activeChat.messages) {
      await sendMessageChat({
        chatId: activeChat.id,
        message: data.message,
        isSecret: false,
      });
    } else {
      await sendMessage({
        userId: activeChat?.id,
        message: data.message,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: data.message, senderId: activeChat?.id },
      ]);
    }
    setMessage('');
  };

  const handleKeyDown = (e: any) => {
    if (e.nativeEvent.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <View className="w-full h-[62px] bg-dark-chatsBarButtonColor flex-row items-center px-[10px] py-[6px]">
      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <TextInput
            placeholder="Write a message..."
            value={message}
            placeholderTextColor={'#8F8F8F'}
            onChangeText={(text) => {
              setMessage(text);
              field.onChange(text);
            }}
            onSubmitEditing={handleSubmit(onSubmit)}
            onKeyPress={handleKeyDown}
            className="flex-1 text-dark-chatsBarTextColor bg-transparent"
          />
        )}
      />
      <TouchableOpacity onPress={handleSubmit(onSubmit)} className="ml-[30px] w-[24px] h-[24px]">
        <MaterialCommunityIcons name="send" size={24} color="#AEAEAE" />
      </TouchableOpacity>
    </View>
  );
}