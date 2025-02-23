import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ActiveChat {
  id: number;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadMessages: number;
  avatar: string;
}

interface ChatState {
  activeChat: any;
  activeTabChat: string;
  activeMoreTab: boolean;
  moreTab: number,
  allChats: any,
  editSteps: number,
  searchUserForPhone: any,
}

const initialState: ChatState = {
  activeChat: null,
  activeTabChat: 'users',
  activeMoreTab: false,
  moreTab: -1,
  allChats: [],
  editSteps: 0,
  searchUserForPhone: null
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
    hideMoreTab: (state) => {
      state.activeMoreTab = false;
    },
    setMoreTab: (state, action: PayloadAction<number>) => {
      state.moreTab = action.payload;
    },
    setInitialMoreTab: (state) => {
      state.moreTab = 0
    },
    clearActiveChat: (state) => {
      state.activeChat = null;
      localStorage.removeItem('activeChat');
    },
    setAllChats: (state, action: PayloadAction<any[]>) => {
      state.allChats = action.payload;
    },
    nextEditStep: (state) => {
      state.editSteps += 1;
    },
    prevEditStep: (state) => {
      state.editSteps -= 1;
    },
    setSearchUserForPhone: (state, action: PayloadAction<any>) => {
      state.searchUserForPhone = action.payload;
    },
  },
});

export const { setActiveChat, selectTab, toggleMoreTab, setMoreTab, setInitialMoreTab, clearActiveChat, setAllChats, hideMoreTab, nextEditStep, prevEditStep, setSearchUserForPhone } = chatSlice.actions;
export default chatSlice.reducer;