import { Header } from 'components/Header/Header'

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
