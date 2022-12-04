import { auth } from "../components/firebase";
import { setAuthToken } from "../config/axiosconfig";
import Router from "next/router";

export const getThemeColor = () =>
  typeof window !== "undefined" &&
  window?.matchMedia &&
  window?.matchMedia("(prefers-color-scheme: dark)")?.matches
    ? "#FFF"
    : "#000";

export const refreshToken = async () => {
  try {
    const token = await auth?.currentUser?.getIdToken(true);
    // token && localStorage.setItem('auth_token', token)
    console.log("Tokenss", token);
    token && setAuthToken(token);
  } catch (e) {
    console.error("Error in refreshing token", e);
    Router.push("/");
  }
};
