import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import { AppInit } from '@components/AppInit'
import store from '@store/store'

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
