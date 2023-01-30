import { setAuthToken } from '../config/axiosconfig';
import { FIREBASE_AUTH } from '../components/firebase';
import Router from 'next/router';
import ReactGA from 'react-ga';
export const getThemeColor = () =>
  typeof window !== 'undefined' &&
  window?.matchMedia &&
  window?.matchMedia('(prefers-color-scheme: dark)')?.matches
    ? '#FFF'
    : '#000';

export const refreshToken = async () => {
  try {
    const token = await FIREBASE_AUTH?.currentUser?.getIdToken(true);
    console.log('Tokensss', token);
    if (token) {
      token && setAuthToken(token);
      token && localStorage.setItem('authToken', token);
      return token;
    }
    throw new Error('Token not found');
  } catch (e) {
    console.error('Errror in refreshing token', e);
    await Router.push('/login');
    throw e;
  }
};

ReactGA.initialize(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || '');

export const pageview = (url: string) => {
  ReactGA.set({ page: url });
  ReactGA.pageview(url);
};

export const numberWithCommas = (x: number | string) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
