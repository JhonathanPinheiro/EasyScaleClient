import { forwardRef, InputHTMLAttributes } from 'react'
import { Errortext } from '../../atoms/error-text'

type TextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className'
> & {
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, TextFieldProps>(function Comp(
  { label, error, ...inputParams },
  ref
) {
  return (
    <>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        ref={ref}
        {...inputParams}
        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 outline-0"
      />
      <Errortext>{error}</Errortext>
    </>
  )
})
