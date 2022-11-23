import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Sidebar from '../components/Sidebar/Sidebar'

export default function App({ Component, pageProps }: AppProps) {
  return (<div>
     {/* <Sidebar /> */}
    <Component {...pageProps} />
    </div>);
}
