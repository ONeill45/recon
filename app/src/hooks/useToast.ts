import { useState } from 'react'

export const useToast = () => {
  const [toastMessage, setToastMessage] = useState('')
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [displayToast, setDisplayToast] = useState(false)

  return {
    toastMessage: toastMessage,
    setToastMessage: setToastMessage,
    updateSuccess: updateSuccess,
    setUpdateSuccess: setUpdateSuccess,
    displayToast: displayToast,
    setDisplayToast: setDisplayToast
  }
}