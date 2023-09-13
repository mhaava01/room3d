import {Html, useGLTF} from "@react-three/drei";
import {useRef, useState} from "react";
import {Selection, EffectComposer, Outline, Select} from "@react-three/postprocessing";
import {useFrame} from "@react-three/fiber";
import { OutlineEffect } from 'postprocessing'

const Room = (): JSX.Element => {
  const { scene } = useGLTF('/white_modern_living_room.glb')
  const { scene: remoteScene } = useGLTF('/tv_remote.glb')

  const initialIframeSrc = "https://player.vimeo.com/video/224891927?h=e629bb5986&autoplay=1&loop=1&title=0&byline=0&portrait=0&?background=1&muted=1"

  const [iframeSrc, setIframeSrc] = useState<string | undefined>()
  const [hovered, setHovered] = useState<boolean>(false)

  const ref = useRef<OutlineEffect>(null);

  let counter = 0
  useFrame((_, delta) =>  {
    if (ref?.current?.edgeStrength === undefined) return
    if (hovered) return (ref.current.edgeStrength = 50)
    ref.current.edgeStrength = (Math.sin(counter)+1)*2
    counter += delta * 2.5
  })

  return (
    <primitive object={scene} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <Selection>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline ref={ref} edgeStrength={0} width={1024} />
        </EffectComposer>
        <Select enabled={true}>
          <primitive
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={() => setIframeSrc(prevState => prevState ? undefined : initialIframeSrc)}
            object={remoteScene}
            scale={0.02}
            position={[-0.2, 0.11, 0.4]}
            rotation={[0, Math.PI/8, 0]}
          >
            <Html
              position={[0, -3, 0]}
              pointerEvents="none"
              className={`${hovered ? '' : 'hidden'} bg-gray-900 text-white rounded-xl px-3 py-1 whitespace-nowrap pointer-events-none`}
            >
              {`Turn TV ${iframeSrc ? 'off' : 'on'}?`}
            </Html>
          </primitive>
        </Select>
      </Selection>
      <Html
        pointerEvents="none"
        transform
        distanceFactor={0.8}
        position={[0.456, 1.37, -2.44]}
      >
        <iframe
          className="bg-black pointer-events-none w-[1024px] h-[568px]"
          src={iframeSrc}
          allow="autoplay; fullscreen; picture-in-picture"
        />
      </Html>
    </primitive>
  )
}

export default Room
