import * as THREE from "three";
import {useFrame, useThree} from "@react-three/fiber";
import {useEffect} from "react";

const lookAtPos = new THREE.Vector3(-2, 1, -2)
const Camera = (): JSX.Element => {
  const three = useThree()

  useEffect(() => {
    three.camera.lookAt(lookAtPos)
  }, [three.camera])

  useFrame((state) => {
    const lookAtPosX = -2 - state.pointer.x/5
    if (lookAtPos.x === lookAtPosX) return
    lookAtPos.x = lookAtPosX
    state.camera.lookAt(lookAtPos)
  })

  return <></>
}

export default Camera
