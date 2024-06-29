import { BackgroundNoise } from "./components/BackgroundNoise"
import { LoadingScreen } from "./components/LoadingScreen"

export const App = () => {
  return (
    <>
      <BackgroundNoise speed={0.005} scale={1000} dotSize={10} gap={0} />
    </>
  )
}