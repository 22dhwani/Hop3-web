import '../styles/globals.css'
import React,{useEffect} from 'react'
import type { AppProps } from 'next/app'
import Router from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(()=>{
    const token = localStorage.getItem('auth_token')
    if(!token){
      Router.push('/')
    }
  },[])
  const token = typeof localStorage != 'undefined' && localStorage?.getItem('auth_token')
  return (<div>
      <Component {...pageProps} />
  </div>);
}
