import Codesandbox from '@components/Codesandbox/Codesandbox'
import FigmaFrame from '@components/FigmaFrame/FigmaFrame'
import Layout from '@components/Layout/Layout'

const Home = () => {
  return (
    <Layout title="Home">
      <Codesandbox embedUrl="https://codesandbox.io/embed/condescending-fire-jirfg6?fontsize=14&hidenavigation=1&theme=dark" />
      <FigmaFrame embedUrl="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAhucizpirybEVrj9t0nVe7%2FUntitled%3Fnode-id%3D0%253A1" />
    </Layout>
  )
}

export default Home
