import create from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from '../config/axiosconfig';

interface UserDetails {
  balance: number;
  createdAt: string;
  email: string;
  id: string;
  image: string;
  role: string;
  total_approved_post: number;
  total_like: number;
  total_post: number;
  updatedAt: string;
  username: string;
  addresses: any[];
  main_zip_code: string[];
  preferred_categories: string[];
  preferred_cities: string[];
  other_category: string;
  is_profile_complete: boolean;
}

export interface StoreState {
  userDetails: UserDetails | null;
  error: string | null;
  loading: boolean;
  fetchUserData: () => Promise<UserDetails | void>;
}

export const useUserStore = create<StoreState>()(
  devtools(set => ({
    userDetails: null,
    error: null,
    loading: false,
    fetchUserData: async () => {
      try {
        set({ loading: true });
        const response = await axios.get('/user/getMineUser');
        if (response?.data) {
          set({ loading: false, userDetails: response?.data, error: null });
          return response?.data;
        }
        set({ loading: false, error: 'Something went wrong' });
      } catch (error: any) {
        console.log('Error in fetching user', error);
        set({ loading: false, error: error?.message });
      }
    },
  })),
);
