import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import store from '@store/store'

import { AppInit } from '../components/AppInit'
import '../styles/global/globals.scss'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <AppInit>
        <Component {...pageProps} />
      </AppInit>
    </Provider>
  )
}

export default App
