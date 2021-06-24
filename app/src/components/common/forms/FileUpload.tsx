import { Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react'
import { FiFile } from 'react-icons/fi'
import { DetailedHTMLProps, InputHTMLAttributes, useRef } from 'react'
import { useState } from 'react'

export const FileUpload: React.FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = ({ onChange, placeholder, ...inputProps }) => {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" children={<Icon as={FiFile} />} />
      <input
        type="file"
        ref={inputRef}
        onChange={(e) => {
          setValue(
            e.target.files && e.target.files.length
              ? e.target.files[0].name
              : '',
          )
          onChange && onChange(e)
        }}
        {...inputProps}
        style={{ display: 'none' }}
      />
      <Input
        placeholder={placeholder || 'Upload a File...'}
        onClick={() => inputRef.current && inputRef.current.click()}
        value={value}
      />
    </InputGroup>
  )
}
