import { RefObject, useEffect } from 'react'

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  action: Function,
  ignoreIds: String[] = [],
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (
        ref.current &&
        !ref.current.contains(target) &&
        !ignoreIds.includes(target.id)
      )
        action()
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}
