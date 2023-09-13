import {Html, useProgress} from "@react-three/drei";

const Loader = (): JSX.Element => {
  const { progress } = useProgress()
  return <Html center>{progress.toFixed()} % loaded</Html>
}

export default Loader
