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
    console.log('Errrorr', err.response.status);
    if (err.response.status === 403) {
      refreshToken()
        .then(token => {
          originalConfig.headers.Authorization = 'Bearer ' + token;
          originalConfig.baseURL = undefined;
          return instance.request(originalConfig);
        })
        .catch(() => {
          return Promise.reject(err);
        });
    } else {
      return Promise.reject(err);
    }
  },
);

export default instance;
