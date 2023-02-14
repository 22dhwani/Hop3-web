import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from '../config/axiosconfig';
import hop3Api from '../config/axiosconfig';

interface ICategoriesDetails {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryStoreState {
  categories: ICategoriesDetails[] | any;
  categoryDetails: { [key: string]: string };
  error: string | null;
  loading: boolean;
  fetchCategoriesData: () => Promise<ICategoriesDetails[] | void>;
}

export const useCategoriesStore = create<CategoryStoreState>()(
  devtools(set => ({
    categories: [{ id: 'other', name: 'Other' }],
    categoryDetails: {},
    error: null,
    loading: false,
    fetchCategoriesData: async () => {
      try {
        set({ loading: true });
        const response = await axios.get('/category/allCategories');
        if (response?.data && Array.isArray(response.data)) {
          const tempObj: any = {};
          response?.data.forEach((item: ICategoriesDetails) => {
            tempObj[item.id] = item?.name;
          });
          set({
            loading: false,
            categories: [...response.data, { id: 'other', name: 'Other' }],
            error: null,
            categoryDetails: tempObj,
          });
          return [...response.data, { id: 'other', name: 'Other' }];
        }
        set({ loading: false, error: 'Something went wrong' });
      } catch (error: any) {
        console.error('Error in fetching categories', error);
        set({ loading: false, error: error?.message });
      }
    },
  })),
);

// export const useCategoriesStoreById = create<CategoryStoreState>()(
//   devtools(set => ({
//     categories: [{ id: 'other', name: 'Other' }],
//     categoryDetails: {},
//     error: null,
//     loading: false,
//     fetchCategoriesData: async () => {
//       try {
//         set({ loading: true });
//         const response = await axios.get(`/category/${category_id}`);
//         if (response?.data && Array.isArray(response.data)) {
//           const tempObj: any = {};
//           response?.data.forEach((item: ICategoriesDetails) => {
//             tempObj[item.id] = item?.name;
//           });
//           set({
//             loading: false,
//             categories: [...response.data, { id: 'other', name: 'Other' }],
//             error: null,
//             categoryDetails: tempObj,
//           });
//           return [...response.data, { id: 'other', name: 'Other' }];
//         }
//         set({ loading: false, error: 'Something went wrong' });
//       } catch (error: any) {
//         console.error('Error in fetching categories', error);
//         set({ loading: false, error: error?.message });
//       }
//     },
//   })),
// );

export const getCategoryById = async ({ queryKey }: any) => {
  const categoryId = queryKey[1];
  console.log(queryKey, 'QUERY');
  // post/getPostById/63d0b3590dc5a1fe7a532d84
  const url = `/post/getPostById/${categoryId}`;
  return (await hop3Api.get(url)).data;
};
