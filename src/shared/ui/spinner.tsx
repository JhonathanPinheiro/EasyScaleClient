import Lottie from 'react-lottie'
import animationData from './lotties/spinner.json'

export function Spinner() {
  return (
    <Lottie
      isClickToPauseDisabled={true}
      style={{
        cursor: 'default',
      }}
      options={{ loop: true, autoplay: true, animationData }}
      width={140}
      height={140}
    />
  )
}
