/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'

import { IGLTF } from '@interfaces/IGLTF'

const Crystal = () => {
  const crystalRef = useRef<THREE.Group>(null!)
  const { nodes, materials } = useGLTF('/model/scene.gltf') as unknown as IGLTF

  useFrame(() => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={crystalRef} dispose={null} position={[0, -2.2, 0]}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0, 0.95, 0]} scale={0.67}>
            <mesh geometry={nodes.Object_4.geometry} material={materials.Crystal} />
          </group>
        </group>
      </group>
    </group>
  )
}

export default Crystal
