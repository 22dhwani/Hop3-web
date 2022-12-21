import React, { useEffect, useState } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { getUser } from '../services/auth';
import { Atom, useAtom } from 'jotai';
import { setuid } from 'process';
import { setAuthToken } from '../config/axiosconfig';
import Cookies from 'js-cookie';
import axios from 'axios';
import { FIREBASE_AUTH, FIREBASE_SERVICE } from '../components/firebase';
import { onAuthStateChanged, User } from '@firebase/auth';
import { refreshToken } from '../utils/utils';
import {
  logEvent,
  isSupported,
  initializeAnalytics,
  Analytics,
} from 'firebase/analytics';
import { useRouter } from 'next/router';
import { pageview } from '../utils/utils';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const [isLoading, setIsLoading] = useState(true);
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

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    const initAnalytics = async () => {
      // await the result of the promise and assign it directly to the GOOGLE_ANALYTICS constant
      const GOOGLE_ANALYTICS: Analytics | null = await isSupported().then(yes =>
        yes ? initializeAnalytics(FIREBASE_SERVICE) : null,
      );
      if (GOOGLE_ANALYTICS)
        router.events.on('routeChangeComplete', handleRouteChange);
    };
    initAnalytics();
    return router.events.off('routeChangeStart', handleRouteChange);
  }, [router.events]);
  return <div></div>;
};
