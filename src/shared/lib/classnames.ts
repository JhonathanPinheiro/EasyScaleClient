import classnames from 'classnames'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: classNames.ArgumentArray): string {
  return twMerge(classnames(inputs))
}
