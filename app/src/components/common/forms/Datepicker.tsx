import React from 'react'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { useColorMode } from '@chakra-ui/react'

export const DatePicker: React.FC<ReactDatePickerProps> = ({
  selected,
  onChange,
  isClearable = false,
  showPopperArrow = true,
  ...props
}) => {
  const isLight = useColorMode().colorMode === 'light' //you can check what theme you are using right now however you want
  return (
    // if you don't want to use chakra's colors or you just wwant to use the original ones,
    // set className to "light-theme-original" ↓↓↓↓
    <div
      className={isLight ? 'date-picker-light-theme' : 'date-picker-dark-theme'}
    >
      <ReactDatePicker
        selected={selected}
        onChange={onChange}
        isClearable={isClearable}
        showPopperArrow={showPopperArrow}
        className="react-datapicker__input-text" //input is white by default and there is no already defined class for it so I created a new one
        {...props}
      />
    </div>
  )
}
