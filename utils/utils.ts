import { FIREBASE_AUTH } from "../components/firebase";
import { setAuthToken } from "../config/axiosconfig";
import Router from "next/router";
import ReactGA from "react-ga";
export const getThemeColor = () =>
  typeof window !== "undefined" &&
  window?.matchMedia &&
  window?.matchMedia("(prefers-color-scheme: dark)")?.matches
    ? "#FFF"
    : "#000";

export const refreshToken = async () => {
  try {
    const token = await FIREBASE_AUTH?.currentUser?.getIdToken(true);
    // token && localStorage.setItem('auth_token', token)
    console.log("Tokenss", token);
    token && setAuthToken(token);
  } catch (e) {
    console.error("Error in refreshing token", e);
    Router.push("/");
  }
};

ReactGA.initialize(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "");

export const pageview = (url: string) => {
  ReactGA.set({ page: url });
  ReactGA.pageview(url);
};
