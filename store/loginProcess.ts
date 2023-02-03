import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface ILoginProcess {
  isLoginProcess: boolean;
  setLoginProcess: (key: boolean) => void;
}

export const useLoginProcess = create<ILoginProcess>()(
  devtools(set => ({
    isLoginProcess: false,
    setLoginProcess: (key: boolean) => {
      set({ isLoginProcess: key });
    },
  })),
);
