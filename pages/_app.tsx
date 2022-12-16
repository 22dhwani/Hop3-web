import React, { useEffect } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { getUser } from '../services/auth';
import { Atom, useAtom } from 'jotai';
import { setuid } from 'process';
import { setAuthToken } from '../config/axiosconfig';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  useEffect(() => {
    const fetchRoutes = async () => {
      const token = localStorage.getItem('authToken');
      token && setAuthToken(token);
      const routes = Cookies.get('routes');
      if (!routes) {
        try {
          const response = await axios.get('/api/readfiles');
          console.log({ response });
          Cookies.set('routes', response?.data?.routes);
        } catch (error) {
          console.log({ error });
        }
      }
    };
    fetchRoutes();
  }, []);
  return (
    <div>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <SetUps />
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}

const SetUps = () => {
  // const [user, setUser] = useAtom(userAtom);

  // const { data, isLoading, error } = useQuery('account', getUser);

  return <div></div>;
};
