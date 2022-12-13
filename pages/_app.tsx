import '../styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { getUser } from '../services/auth';
import { Atom, useAtom } from 'jotai';
import { setuid } from 'process';
import { setAuthToken } from '../config/axiosconfig';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

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

  const { data, isLoading, error } = useQuery('account', getUser);

  return <div></div>;
};
