import { Spinner } from './spinner'

export function LoadingFullScreen() {
  return (
    <div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-100'>
      <Spinner />
    </div>
  )
}
