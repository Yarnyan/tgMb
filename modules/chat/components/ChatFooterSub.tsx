import { View, TouchableOpacity, Text} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useSubcChannelMutation } from '@/store/api/Group';
import { useGetChatsQuery } from '../../../store/api/Chat';

type Props = {};

export default function ChatFooterSub({}: Props) {
    const activeChat = useAppSelector((state) => state.chat.activeChat);
    const profile = useAppSelector((state) => state.profile.profile);
    const dispatch = useAppDispatch();
    const [subscribeChannel] = useSubcChannelMutation();
    const { refetch: refetchChats } = useGetChatsQuery(null);

    const subs = async () => {
        try {
            const body = {
                chatId: activeChat?.id,
                userId: profile?.id,
            };

            if (!activeChat || !profile) {
                console.error('Active chat or profile is not available');
                return;
            }

            await subscribeChannel(body).then(() => {
                refetchChats();
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View className="w-full h-[62px] bg-[var(--pinnedMessage)] flex-row items-center justify-center">
            <TouchableOpacity
                onPress={subs}
                className="w-full h-[62px] flex-row justify-center items-center"
            >
                <Text className="text-[16px] font-bold text-[var(--storiesBarMenuTextColor)]">
                    Join channel
                </Text>
            </TouchableOpacity>
        </View>
    );
}