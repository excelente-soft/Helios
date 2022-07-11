import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'

import AppInit from '@components/AppInit'
import store from '@store/store'

import '@styles/global/globals.scss'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=10" />
        <meta name="description" content="Helios - education system" />
        <meta name="keywords" content="educate system, education, courses" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#ffb987" />
      </Head>
      <Provider store={store}>
        <AppInit>
          <Component {...pageProps} />
        </AppInit>
      </Provider>
    </>
  )
}

export default App
