import "../styles/globals.scss";
import React, { useEffect, useCallback, useState } from "react";
import type { AppProps } from "next/app";
import Router from "next/router";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Atom, useAtom } from "jotai";
import { setuid } from "process";
import { FIREBASE_AUTH, FIREBASE_SERVICE } from "../components/firebase";
import { onAuthStateChanged, User } from "@firebase/auth";
import { refreshToken } from "../utils/utils";
import {
  logEvent,
  isSupported,
  initializeAnalytics,
  Analytics,
} from "firebase/analytics";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   const token = localStorage.getItem("auth_token");
  //   if (!token) {
  //     Router.push("/");
  //   }
  // }, []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let tempFlag = false;
    const onAuthStateChange = async (user: User | null) => {
      if (!tempFlag && user) {
        tempFlag = true;
        console.log("USersss", user);
        await refreshToken();
        setIsLoading(false);
      } else if (!user) {
        if (Router.pathname !== "/") {
          await Router.push("/login");
        }
        setIsLoading(false);
      }
    };
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, onAuthStateChange);
    return () => unsubscribe();
  }, []);
  const queryClient = new QueryClient();

  const token =
    typeof localStorage != "undefined" && localStorage?.getItem("auth_token");

  return (
    <>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <SetUps />
        {!isLoading && <Component {...pageProps} />}
      </QueryClientProvider>
    </>
  );
}

const SetUps = () => {
  // const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  useEffect(() => {
    const initAnalytics = async () => {
      // await the result of the promise and assign it directly to the GOOGLE_ANALYTICS constant
      const GOOGLE_ANALYTICS: Analytics | null = await isSupported().then(
        (yes) => (yes ? initializeAnalytics(FIREBASE_SERVICE) : null)
      );
      if (GOOGLE_ANALYTICS)
        router.events.on("routeChangeStart", (url) => {
          logEvent(GOOGLE_ANALYTICS, "page_view", {
            page_location: url,
          });
        });
    };
    initAnalytics();
    return router.events.off("routeChangeStart", (url) => {});
  }, [router.events]);

  return <></>;
};
