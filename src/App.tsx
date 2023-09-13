import {Canvas} from '@react-three/fiber'
import {Suspense} from "react";
import Loader from "./components/loader.tsx";
import Room from "./components/room.tsx";
import Camera from "./components/camera.tsx";

function App() {

  return (
    <Canvas camera={{position: [2, 1.5, 2]}}>

      {/*<Perf position="top-left" />*/}
      <Camera />
      <directionalLight position={[0,2,0]} intensity={7} />
      <ambientLight intensity={5} />

      <Suspense fallback={<Loader />}>
        <Room />
      </Suspense>

    </Canvas>
  )
}

export default App
