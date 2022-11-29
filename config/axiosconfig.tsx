import axios from 'axios'
import { Hop3Api_Local as Hop3_Service_Url } from "../serviceConfig";

import {AxiosRequestConfig} from "axios";
const instance = axios.create({
  baseURL: Hop3_Service_Url,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers = config.headers ?? {};
        config.headers['Authorization'] = `Bearer ${token}`;
        console.log({config})
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    // localStorage.removeItem('auth_token')
    return Promise.reject(err);
  }
);

export default instance;