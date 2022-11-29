import "../styles/globals.css";
import React, {useEffect, useRef} from "react";
import type { AppProps } from "next/app";
import Router from "next/router";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Atom, useAtom } from "jotai";
import { setuid } from "process";
import {auth} from "../components/firebase";
import {onAuthStateChanged, User} from "@firebase/auth";
import {refreshToken} from "../utils/utils";

export default function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   const token = localStorage.getItem("auth_token");
  //   if (!token) {
  //     Router.push("/");
  //   }
  // }, []);


  useEffect(() => {
    let tempFlag = false
    console.log("App use effect")
    const onAuthStateChange = async  (user:User | null) => {
      if(!tempFlag && user) {tempFlag = true
        console.log("USersss", user)
        await refreshToken()
        if(Router.pathname !== "/dashboard"){
          await Router.push("/dashboard");
        }
        setTimeout(() => {
          tempFlag = false
        }, 3000)
      }
    }
     const unsubscribe = onAuthStateChanged(auth,onAuthStateChange)
    return () => unsubscribe()
  }, []);
  const queryClient = new QueryClient();

  const token =
    typeof localStorage != "undefined" && localStorage?.getItem("auth_token");

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

  // const { data, isLoading, error } = useQuery("account", getUser);

  return <div></div>;
};
