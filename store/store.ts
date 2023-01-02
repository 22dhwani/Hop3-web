import create, { UseBoundStore } from 'zustand';
import { devtools } from 'zustand/middleware';
export interface StoreState {
  user: string[];
  error: Error | null;
  loading: boolean;
  setUserData: (data: any) => void;
  setData: (data: any) => void;
}

export const useStore = create<any>(
  devtools(set => ({
    user: [],
    error: null,
    loading: false,
    setUserData: (newData: any) =>
      set((state: any) => ({ ...state, user: newData })),
    setData: (data: any) => set((state: any) => ({ ...state, ...data })),
    // setUser: newData => set(state => ({ ...state, data1: newData })),
  })),
);
