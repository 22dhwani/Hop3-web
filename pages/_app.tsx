/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { resetAuthToken, setAuthToken } from '../config/axiosconfig';
import { FIREBASE_AUTH, FIREBASE_SERVICE } from '../components/firebase';
import {
  Analytics,
  initializeAnalytics,
  isSupported,
} from 'firebase/analytics';
import { useRouter } from 'next/router';
import { pageview, refreshToken } from '../utils/utils';
import { useUserStore } from '../store/userStore';
import { useCategoriesStore } from '../store/categoriesStore';
import { User } from '@firebase/auth';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const { fetchUserData } = useUserStore();
  const { fetchCategoriesData } = useCategoriesStore();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const routeName = useRef(router.pathname);

  useEffect(() => {
    routeName.current = router.pathname;
  }, [router.pathname]);

  useEffect(() => {
    // const fetchRoutes = async () => {
    //   const token = localStorage.getItem('authToken');
    //   token && setAuthToken(token);
    //   token && (await fetchUserData());
    //   // const routes = Cookies.get('routes');
    //   // if (!routes) {
    //   //   try {
    //   //     const response = await axios.get('/api/readfiles');
    //   //     console.log({ response });
    //   //     Cookies.set('routes', response?.data?.routes);
    //   //     setIsLoading(false);
    //   //   } catch (error) {
    //   //     console.log({ error });
    //   //     setIsLoading(false);
    //   //   }
    //   // } else {
    //   //   setIsLoading(false);
    //   // }
    // };
    // fetchRoutes().then();
    const onAuthStateChange = async (user: User | null) => {
      console.log('Userss', user);
      try {
        if (!user) {
          resetAuthToken();
          localStorage.removeItem('authToken');
          console.log('router', router.pathname);
          if (routeName.current !== '/login' && routeName.current !== '/') {
            await router.replace('/login');
          }
        } else if (user) {
          let token = localStorage.getItem('authToken');
          if (!token) {
            token = await refreshToken();
          }
          token && setAuthToken(token);
          let userResponse = null;
          let userNotfound = false;
          if (token) {
            try {
              userResponse = await fetchUserData();
            } catch (e: any) {
              console.log('Error in fetch user ', e?.response?.status);
              if (e?.response?.status === 404) {
                userNotfound = true;
              }
            }
          }
          if (
            userResponse &&
            (routeName.current === '/' ||
              routeName.current === '/login' ||
              routeName.current === '/userDetails')
          ) {
            await router.replace('/explore');
          } else if (userNotfound) {
            await router.replace('/userDetails');
          }
        }
        setIsLoading(false);
      } catch (e) {
        console.log('Error in auth', e);
        setIsLoading(false);
      }
    };
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(onAuthStateChange);
    fetchCategoriesData().then();
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <SetUps />
        {isLoading ? (
          <div
            style={{
              height: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {'Loading...'}
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </QueryClientProvider>
    </div>
  );
}

const SetUps = () => {
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

      if (GOOGLE_ANALYTICS) {
        router.events.on('routeChangeComplete', handleRouteChange);
      }
    };
    initAnalytics();
    return router.events.off('routeChangeStart', handleRouteChange);
  }, [router.events]);
  return null;
};
