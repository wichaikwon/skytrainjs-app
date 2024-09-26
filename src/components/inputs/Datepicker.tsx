import { formatDate } from '@/utils/date'
import { forwardRef, HTMLProps } from 'react'
import ReactDatePicker from 'react-datepicker'

interface DatepickerProps {
  value: string
  onChange: (value: string) => void
}

const CustomDatePicker = forwardRef<HTMLButtonElement, HTMLProps<HTMLButtonElement>>(
  ({ value, disabled, onClick }, ref) => {
    return (
      <button className="h-full text-black w-52" ref={ref} disabled={disabled} onClick={onClick}>
        <div className="flex items-center justify-between p-2">{value && formatDate(value.toString())}</div>
      </button>
    )
  }
)

CustomDatePicker.displayName = 'CustomDatePicker'

const Datepicker: React.FC<DatepickerProps> = ({ value, onChange }) => {
  return (
    <div className="flex justify-center">
      <ReactDatePicker
        customInput={<CustomDatePicker />}
        selected={new Date(value)}
        minDate={new Date()}
        onChange={(date) => {
          if (date) {
            onChange(date.toISOString())
          }
        }}
      />
    </div>
  )
}

export default Datepicker