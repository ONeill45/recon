import { formatDistance, isFuture, isPast } from 'date-fns'

export const getDurationText = (startDate: Date, endDate: Date) => {
  const now = new Date()
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : null
  if (end && isPast(end))
    return `Ended ${formatDistance(end, now, {
      addSuffix: true,
    })}`

  if (end)
    return `Ending ${formatDistance(end, now, {
      addSuffix: true,
    })}`

  if (isFuture(start))
    return `Starting ${formatDistance(start, now, {
      addSuffix: true,
    })}`

  return `Started ${formatDistance(start, now, {
    addSuffix: true,
  })}`
}

export const formatDate = (date: Date) => {
  const newDate = date.toString().split('T')[0].split('-')
  return `${newDate[1]}-${newDate[2]}-${newDate[0]}`
}
