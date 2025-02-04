import * as PrimitiveToast from '@radix-ui/react-toast'
import { useRef } from 'react'
import toast from 'react-hot-toast'
import { tv } from 'tailwind-variants'
import { Checkmark, Delete, Error, Info, Warning } from '../icons'
import type { ToastOptions } from '.'

const toastStyles = tv({
  slots: {
    root: 'rounded-t bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]',
    container: 'flex w-full items-center gap-2 p-4',
    title:
      'flex items-center justify-between gap-2 text-xs font-extrabold text-gray-900',
    description: 'text-xs font-semibold text-gray-900',
    progress: 'h-[2px] w-full',
    statusIcon: 'min-h-5 min-w-5',
  },
  variants: {
    type: {
      success: {
        progress: 'bg-green-600',
        statusIcon: 'fill-green-600',
      },
      error: {
        progress: 'bg-red-600',
        statusIcon: '',
      },
      warning: {
        progress: 'bg-yellow-600',
        statusIcon: 'fill-yellow-600',
      },
      info: {
        progress: 'bg-primary-500',
        statusIcon: 'fill-primary-500',
      },
    },
  },
})

const icons = {
  error: Error,
  success: Checkmark,
  info: Info,
  warning: Warning,
}

interface ToastProps {
  id: string
  open: boolean
  type: 'success' | 'error' | 'warning' | 'info'
  duration: number
}

export function Toast({
  id,
  open,
  duration,
  type,
  title,
  description,
}: ToastProps & ToastOptions) {
  const progressRef = useRef<HTMLDivElement>(null)
  const durationIsInfinity = duration === Infinity
  const styles = toastStyles({ type })
  function handleOpenChange() {
    toast.dismiss(id)
  }
  function handlePause() {
    if (progressRef.current) {
      progressRef.current.style.animationPlayState = 'paused'
    }
  }
  function handleResume() {
    if (progressRef.current) {
      progressRef.current.style.animationPlayState = 'running'
    }
  }
  const CurrentIcon = icons[type]
  return (
    <PrimitiveToast.Root
      open={open}
      duration={duration}
      onOpenChange={handleOpenChange}
      onPause={handlePause}
      onResume={handleResume}
      className={styles.root()}
    >
      <div className={styles.container()}>
        {<CurrentIcon className={styles.statusIcon()} />}
        <div>
          <PrimitiveToast.Title className={styles.title()}>
            {title}
          </PrimitiveToast.Title>
          {description && (
            <PrimitiveToast.Description className={styles.description()}>
              {description}
            </PrimitiveToast.Description>
          )}
        </div>
        <button onClick={() => handleOpenChange()} className='ml-auto'>
          <Delete width={24} height={24} />
        </button>
      </div>
      {durationIsInfinity ? null : (
        <div
          ref={progressRef}
          className={styles.progress()}
          style={{
            animation: `progress-bar ${duration / 1000}s linear forwards`,
          }}
        />
      )}
    </PrimitiveToast.Root>
  )
}
