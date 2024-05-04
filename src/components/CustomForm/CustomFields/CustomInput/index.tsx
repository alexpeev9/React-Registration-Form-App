import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as InputField
} from '@chakra-ui/react'
import { FieldValues, useController } from 'react-hook-form'

import { CustomInputParams } from './types'

const CustomInput = <T extends FieldValues>({
  label,
  name,
  inputType,
  control,
  trigger
}: CustomInputParams<T>) => {
  // Get field values and error status
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control
  })

  // Function to validate input and trigger form validation
  const validateText = async () => {
    field.onBlur()
    trigger([name])
  }

  // Customize field object to include custom event handler
  const customField = { ...field, onBlur: validateText }

  return (
    <FormControl id={name} isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <InputField placeholder={label} type={inputType} {...customField} />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}

export default CustomInput
