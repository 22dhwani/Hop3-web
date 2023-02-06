import axios from 'axios';
import { Hop3Api_Dev as Hop3_Service_Url } from '../serviceConfig';

import { AxiosRequestConfig } from 'axios';
import { refreshToken } from '../utils/utils';
const instance = axios.create({
  baseURL: Hop3_Service_Url,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string) => {
  console.log({ token });
  instance.defaults.headers.Authorization = 'Bearer ' + token;
};

export const resetAuthToken = () => {
  instance.defaults.headers.Authorization = null;
};

// instance.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

instance.interceptors.response.use(
  res => {
    return res;
  },
  async err => {
    const originalConfig = err.config;
    if (err?.response?.status === 403) {
      try {
        const token = await refreshToken();
        originalConfig.headers.Authorization = 'Bearer ' + token;
        return await axios.request(originalConfig);
      } catch (e) {
        return Promise.reject(err);
      }
    } else {
      return Promise.reject(err);
    }
  },
);

export default instance;
