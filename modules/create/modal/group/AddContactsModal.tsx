import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { nextStep, prevStep } from '../../../../store/reducers/stepsSlice';
import Contact from '../../components/Contanct';
import { useAddUserGroupMutation } from '../../../../store/api/Group';
import { clearSteps } from '../../../../store/reducers/stepsSlice';
type Props = {
  onClose: () => void;
};

const AddContactsModal = ({ onClose }: Props) => {
  const group = useAppSelector((state) => state.create.newGroup);
  const allChats = useAppSelector((state) => state.chat.allChats);
  const profile = useAppSelector((state) => state.profile.profile);
  const dispatch = useAppDispatch();
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [addUserGroup] = useAddUserGroupMutation();

  const handleContactSelect = (contact: any) => {
    setSelectedContact(contact);
  };

  const filteredData = allChats.filter((item: any) => item.chatType !== 2);

  const filteredUsers = filteredData.flatMap((chat: any) =>
    chat.users ? chat.users.filter((user: any) => user.id !== profile?.id) : []
  );

  const addUsers = async () => {
    if (selectedContact) {
      const result = await addUserGroup({ chatId: group?.id || 0, userId: selectedContact.id });
      if (result.error) {
        console.log(result.error);
      } else {
        dispatch(clearSteps());
        onClose();
      }
    }
  };

  return (
    <View className="w-full p-4 flex flex-col">
      <View className="mt-4 w-full flex flex-col">
        <Text className="text-base font-medium text-dark-storiesBarMenuTextColor">Add members</Text>
        <View className="flex-row items-center mt-4 bg-dark-chatsBarItemColor rounded-full">
          <TextInput
            placeholder="Search..."
            placeholderTextColor={'#AEAEAE'}
            className="w-full h-11 pl-4 text-dark-chatsBarTextColor"
          />
        </View>
      </View>

      <View>
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-row items-center py-3 hover:bg-dark-chatsBarItemColor"
              onPress={() => handleContactSelect(item)}
            >
              <Contact
                contact={item}
                key={item.id}
                isSelected={selectedContact?.id === item.id}
                onSelect={handleContactSelect}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      <View className="mt-2 flex-row justify-end">
        <TouchableOpacity
          className="p-4 hover:bg-dark-createModalHoverColorButton rounded-full duration-500"
          onPress={() => dispatch(prevStep())}
        >
          <Text className='text-dark-createModalTextColorButton font-semibold text-sm'>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="p-4 hover:bg-dark-createModalHoverColorButton rounded-full ml-3 duration-500"
          onPress={addUsers}
        >
          <Text className='text-dark-createModalTextColorButton font-semibold text-sm'>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddContactsModal;