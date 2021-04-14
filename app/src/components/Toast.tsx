import styled from '@emotion/styled'
import React, { useEffect } from 'react'

type toastProps = {
  message: string
  success: boolean
  display: boolean
  setDisplayToast: any
}

type toastContainerProps = {
  display: boolean
  success: boolean
}

const ToastContainer = styled.div<toastContainerProps>`
  display: ${(props: any) => props.display ? 'block' : 'none'};
  background-color: ${(props: any) => props.success ? '#45ad78' : '#e34b4b'};
  position: fixed;
  right: 2rem;
  top: 2rem;
  text-align: center;
  width: 300px;
  padding: 1rem;
  border-radius: 0.8rem;
`

export const Toast = ({ message, success, display, setDisplayToast }: toastProps) => {
  
  useEffect(() => {
    let handler: any
    handler = setTimeout(() => {
      setDisplayToast(false)
    }, 5000)

    return () => {
      clearTimeout(handler)
    }
  })

  return (
    <ToastContainer display={display} success={success}>
      {message}
    </ToastContainer>
  )
}
