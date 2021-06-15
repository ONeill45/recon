import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'

type toastProps = {
  success: boolean
  display: boolean
  setDisplayToast: (b: boolean) => void
  headerText?: string
  fields?: Array<string>
}

type toastContainerProps = {
  display: boolean
  success: boolean
}

const ToastContainer = styled.div<toastContainerProps>`
  display: ${(props: any) => (props.display ? 'block' : 'none')};
  background-color: ${(props: any) => (props.success ? '#45ad78' : '#e34b4b')};
  position: fixed;
  right: 2rem;
  top: 2rem;
  text-align: center;
  width: 300px;
  padding: 1rem;
  border-radius: 0.8rem;
`

const ToastInnerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  svg {
    position: absolute;
    right: -0.75rem;
    top: -0.75rem;
    font-size: 1.2rem;
    font-weight: 600;

    &:hover {
      cursor: pointer;
    }
  }
`

const ToastHeader = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`

const Field = styled.div`
  text-align: center;
  margin: 0.3rem 0;
`

export const Toast = ({
  fields,
  headerText,
  success,
  display,
  setDisplayToast,
}: toastProps) => {
  useEffect(() => {
    let handler: any
    handler = setTimeout(() => {
      setDisplayToast(false)
    }, 7000)

    return () => {
      clearTimeout(handler)
    }
  })

  const hideToast = () => {
    setDisplayToast(false)
  }

  return (
    <ToastContainer display={display} success={success}>
      <ToastInnerContainer>
        <AiFillCloseCircle onClick={hideToast} size={20} />
        <ToastHeader>{headerText}</ToastHeader>
        {fields?.map((field: string) => (
          <Field>{field}</Field>
        ))}
      </ToastInnerContainer>
    </ToastContainer>
  )
}
