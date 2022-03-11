import { Header } from '../Header/Header'

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
