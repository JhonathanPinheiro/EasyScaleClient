import { format, parseISO } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

export function MultipleDatePicker({
  selectedDates,
  setSelectedDates,
}: {
  selectedDates: string[]
  setSelectedDates: (dates: string[]) => void
}) {
  const parsedDates = selectedDates.map((d) => parseISO(d))

  const handleSelect = (dates?: Date[]) => {
    const formatted = dates?.map((d) => format(d, 'yyyy-MM-dd')) || []
    setSelectedDates(formatted)
  }

  return (
    <DayPicker
      mode="multiple"
      selected={parsedDates}
      onSelect={handleSelect}
      className="rounded-md border p-4 shadow-sm"
    />
  )
}
