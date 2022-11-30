import "../styles/globals.css";
import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import Router from "next/router";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { getUser } from "../services/auth";
import { Atom, useAtom } from "jotai";
import { setuid } from "process";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      Router.push("/");
    }
  }, []);
  const queryClient = new QueryClient();

  const token =
    typeof localStorage != "undefined" && localStorage?.getItem("auth_token");

  return (
    <>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <SetUps />
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

const SetUps = () => {
  // const [user, setUser] = useAtom(userAtom);

  const { data, isLoading, error } = useQuery("account", getUser);

  return <div></div>;
};
