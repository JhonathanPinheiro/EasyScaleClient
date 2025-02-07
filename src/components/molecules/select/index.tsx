import Select from 'react-select'
import { Errortext } from '../../atoms/error-text'
import {
  Control,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form'

interface Option {
  value: string
  label: string
}

interface SelectTProps {
  control: Control<FieldValues>
  name: string
  label: string
  options: Option[] // Agora recebe opções de fora
  error?: string
}

const SelectField = <T extends FieldValues>(
  props: UseControllerProps<T> & { options: Option[] }
) => {
  const { options, ...controllerProps } = props
  const {
    field: { onChange, value, ref },
  } = useController(controllerProps)

  return (
    <Select
      ref={ref}
      value={options.find((option) => option.value === value) || null}
      onChange={(newValue) => onChange(newValue?.value || '')}
      options={options}
    />
  )
}

export const SelectCustom = ({
  control,
  name,
  label,
  options,
  error,
}: SelectTProps) => {
  return (
    <div className="mt-4 w-full">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <SelectField control={control} name={name} options={options} />
      {error && <Errortext>{error}</Errortext>}
    </div>
  )
}
