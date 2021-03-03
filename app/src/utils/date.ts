import {
  format,
  formatDistanceToNow,
  formatDuration,
  intervalToDuration,
  isFuture,
  isPast,
} from 'date-fns'

export const getRelativeTime = (startDate: Date, endDate: Date) => {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : null
  if (end && isPast(end))
    return `Ended ${formatDistanceToNow(end, {
      addSuffix: true,
    })}`

  if (end)
    return `Ending ${formatDistanceToNow(end, {
      addSuffix: true,
    })}`

  if (isFuture(start))
    return `Starting ${formatDistanceToNow(start, {
      addSuffix: true,
    })}`

  return `Started ${formatDistanceToNow(start, {
    addSuffix: true,
  })}`
}

export const getDuration = (startDate: Date, endDate?: Date) =>
  formatDuration(
    intervalToDuration({
      start: new Date(startDate),
      end: endDate ? new Date(endDate) : new Date(),
    }),
    { format: ['years', 'months'] },
  )

export enum DateFormat {
  DATE_ONLY = 'M/d/yyyy',
}
export const formatDate = (date: Date, dateFormat: DateFormat) =>
  format(new Date(date), dateFormat)
