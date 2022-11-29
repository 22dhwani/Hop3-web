import { auth } from "../components/firebase";
export const getThemeColor= () => typeof window !== 'undefined' &&  window?.matchMedia && window?.matchMedia('(prefers-color-scheme: dark)')?.matches ? '#FFF':'#000'
export const getToken = () =>{
    return auth?.currentUser?.getIdToken(true)
}