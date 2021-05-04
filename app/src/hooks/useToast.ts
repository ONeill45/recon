import { useState } from 'react'

export const useToast = () => {
  const [toastHeader, setToastHeader] = useState('')
  const [toastFields, setToastFields] = useState<Array<string>>()
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [displayToast, setDisplayToast] = useState(false)

  return {
    toastHeader: toastHeader,
    setToastHeader: setToastHeader,
    toastFields: toastFields,
    setToastFields: setToastFields,
    updateSuccess: updateSuccess,
    setUpdateSuccess: setUpdateSuccess,
    displayToast: displayToast,
    setDisplayToast: setDisplayToast,
  }
}
