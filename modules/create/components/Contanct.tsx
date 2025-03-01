import React from 'react';
import { View, Image, TouchableOpacity, Text} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = {
  contact: any;
  isSelected: any;
  onSelect: (contact: any) => void;
};

const Contact = ({ contact, isSelected, onSelect }: Props) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center p-3 ${isSelected ? 'bg-dark-chatsBarItemColor' : ''}`}
      onPress={() => onSelect(contact)}
    >
      <Image
        source={
          contact.avatar
            ? { uri: 'http://192.168.0.44:5199/' + `${contact.avatar}` }
            : require('../../../assets/image/user.png')
        }
        className="rounded-full w-12 h-12"
      />
      <View className="ml-3 flex-1">
        <Text className="text-dark-storiesBarMenuTextColor text-sm font-medium">{contact.username}</Text>
      </View>
      {isSelected && <AntDesign name="check" size={24} color="#AEAEAE" />}
    </TouchableOpacity>
  );
};

export default Contact;