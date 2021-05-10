export const validateMutationParams = (
  params: Array<{ [key: string]: any; displayText: string }>,
  toastFuncs: {
    setDisplayToast: (b: boolean) => void
    setToastHeader: (s: string) => void
    setUpdateSuccess: (b: boolean) => void
    setToastFields: (a: Array<string>) => void
  },
) => {
  const toastHeader =
    'Form submission unsuccessful. The following field(s) cannot be empty:'
  let nullCheck = false
  let nullDisplayTexts: Array<string> = []

  params.map((param: any) => {
    Object.entries(param).map((obj: any, index: number) => {
      const value = obj[1]
      if (index === 0) {
        if (!value) {
          nullCheck = true
          nullDisplayTexts.push(param.displayText)
        }
      }
    })
  })

  if (nullCheck) {
    toastFuncs.setToastHeader(toastHeader)
    toastFuncs.setToastFields(nullDisplayTexts)
    toastFuncs.setUpdateSuccess(false)
    toastFuncs.setDisplayToast(true)
  }

  return nullCheck
}
