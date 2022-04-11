import { FigmaFrame } from '@components/Figma/FigmaFrame'
import { Layout } from '@components/Layout/Layout'

const Home = () => {
  return (
    <Layout title="Home">
      <FigmaFrame
        embedUrl={`https://www.figma.com/embed?embed_host=astra&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F4B0x88GhiZvgVlcQPSQ73D%2F404-page%3Fnode-id%3D0%253A1&chrome=DOCUMENTATION"`}
      />
    </Layout>
  )
}

export default Home
