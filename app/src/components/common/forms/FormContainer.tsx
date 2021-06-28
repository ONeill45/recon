import React from 'react'
import { Stack } from '@chakra-ui/react'

import { Button } from '../Button'
import { useRouter } from 'next/router'

type FormContainerProps = {
  showButtons?: boolean
  showCancelButton?: boolean
  isLoading?: boolean
  disableSubmit?: boolean
  submitButtonLabel?: string
  onSubmit?: React.FormEventHandler<HTMLFormElement>
}

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  onSubmit,
  submitButtonLabel = 'Submit',
  showButtons = true,
  showCancelButton = true,
  isLoading = false,
  disableSubmit = false,
}) => {
  const router = useRouter()

  const handleCancel = () => router.back()

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing="4" marginBottom="8">
        {children}
      </Stack>
      {showButtons && (
        <Stack direction="row" spacing="10">
          <Button
            name={submitButtonLabel}
            type="submit"
            disabled={disableSubmit}
            isLoading={isLoading}
          >
            {submitButtonLabel}
          </Button>
          {showCancelButton && (
            <Button
              type="button"
              variant="outline"
              colorScheme="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )}
        </Stack>
      )}
    </form>
  )
}
