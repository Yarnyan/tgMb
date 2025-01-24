import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ActiveChat {
  id: number;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadMessages: number;
  src: string;
}

interface ChatState {
  activeChat: ActiveChat | null;
  activeTabChat: string;
  activeMoreTab: boolean;
  moreTab: number,
}

const initialState: ChatState = {
  activeChat: null,
  activeTabChat: 'users',
  activeMoreTab: false,
  moreTab: 0,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<ActiveChat>) => {
      state.activeChat = action.payload;
    },
    selectTab: (state, action: PayloadAction<string>) => {
      state.activeTabChat = action.payload;
    },
    toggleMoreTab: (state) => {
      state.activeMoreTab = !state.activeMoreTab;
    },
    setMoreTab: (state, action: PayloadAction<number>) => {
      state.moreTab = action.payload;
    },
    setInitialMoreTab: (state) => {
      state.moreTab = 0
    }
  },
});

export const { setActiveChat, selectTab, toggleMoreTab, setMoreTab, setInitialMoreTab } = chatSlice.actions;
export default chatSlice.reducer;