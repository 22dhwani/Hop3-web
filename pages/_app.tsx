import "../styles/globals.css";
import React, {useEffect, useRef, useState} from "react";
import type { AppProps } from "next/app";
import Router from "next/router";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Atom, useAtom } from "jotai";
import { setuid } from "process";
import {auth} from "../components/firebase";
import { onAuthStateChanged, User } from "@firebase/auth";
import { refreshToken } from "../utils/utils";

export default function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   const token = localStorage.getItem("auth_token");
  //   if (!token) {
  //     Router.push("/");
  //   }
  // }, []);
  const [isLoading,setIsLoading] = useState(true)


  useEffect(() => {
    let tempFlag = false
    const onAuthStateChange = async  (user:User | null) => {
      if(!tempFlag && user) {
        tempFlag = true
        console.log("USersss", user)
        await refreshToken()
        if(Router.pathname !== "/dashboard"){
          await Router.push("/dashboard");
        }
        setIsLoading(false)
      }else if( !user){
        if(Router.pathname !== "/"){
          await Router.push("/");
        }
        setIsLoading(false)
      }
    }
     const unsubscribe = onAuthStateChanged(auth,onAuthStateChange)
    return () => unsubscribe()
  }, []);
  const queryClient = new QueryClient();

  const token =
    typeof localStorage != "undefined" && localStorage?.getItem("auth_token");

  return (
    <>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <SetUps />
        {!isLoading &&   <Component {...pageProps} />}
      </QueryClientProvider>
    </>
  );
}

const SetUps = () => {
  // const [user, setUser] = useAtom(userAtom);

  // const { data, isLoading, error } = useQuery("account", getUser);

  return <div></div>;
};
