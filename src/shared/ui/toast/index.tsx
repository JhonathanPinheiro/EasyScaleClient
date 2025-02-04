import { toast as hotToast } from 'react-hot-toast'
import { Toast } from './toast'

export interface ToastOptions {
  title: string
  description?: string
  duration?: number
}

function toastBuilder(type: 'success' | 'error' | 'warning' | 'info') {
  return ({ duration, ...options }: ToastOptions) =>
    hotToast.custom(({ id, visible }) => (
      <Toast
        type={type}
        id={id}
        open={visible}
        duration={duration || 3500}
        {...options}
      />
    ))
}

export const appToast = {
  error: toastBuilder('error'),
  success: toastBuilder('success'),
  info: toastBuilder('info'),
  warning: toastBuilder('warning'),
}
