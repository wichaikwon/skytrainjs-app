import { differenceInDays, format } from 'date-fns'

export const isExpired = (date: Date) => {
  const now = new Date()

  // Set hours to 0 to compare only days
  now.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)

  return differenceInDays(now, date) > 0
}

export const formatDate = (date: string) => {
  return format(new Date(date), 'dd-MM-yyyy')
}