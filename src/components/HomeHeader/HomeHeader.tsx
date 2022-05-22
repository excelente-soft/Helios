import { PresentationControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Image from 'next/image'
import Link from 'next/link'

import Crystal from '@components/Crystal/Crystal'
import { MemoizedStarsPlate } from '@components/StarsPlate/StarsPlate'
import RockImage from '@images/rocks.svg'

import S from './HomeHeader.module.scss'
import CS from '@common.module.scss'

const HomeHeader = () => {
  return (
    <section className={S.header}>
      <MemoizedStarsPlate />
      <div className={S.threeWrapper}>
        <div className={S.three}>
          <Canvas camera={{ position: [0, 0, 10], fov: 25 }}>
            <PresentationControls
              global
              snap={false}
              polar={[0, 0]}
              azimuth={[-Infinity, Infinity]}
              rotation={[0, 0, 0]}
              config={{ mass: 2, tension: 250 }}
            >
              <Crystal />
            </PresentationControls>
          </Canvas>
        </div>
      </div>
      <h1 className={S.helios}>Helios - education system</h1>
      <h2 className={S.opportunities}>
        Imagine a place where everyone can learn where they want and when they want. Where there are no teachers and
        lecturers, where you choose what you want to study
      </h2>
      <div className={S.rocks}>
        <Image src={RockImage} layout="fill" objectFit="fill" alt="rocks"></Image>
      </div>
      <div className={S.controls}>
        <Link href="/courses">
          <a className={`${CS.btnSecondary} ${S.btnControl}`}>Сontinue learning</a>
        </Link>
        <Link href="/catalog">
          <a className={`${CS.btnPrimary} ${S.btnControl}`}>Start journey</a>
        </Link>
      </div>
    </section>
  )
}

export default HomeHeader
