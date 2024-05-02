import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as InputField
} from '@chakra-ui/react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

const CustomInput = ({
  fieldError,
  label,
  id,
  inputType,
  register
}: {
  fieldError: FieldError | undefined
  label: string
  id: string
  inputType: string
  register: UseFormRegisterReturn<string>
}) => {
  return (
    <FormControl id={id} isInvalid={!!fieldError}>
      <FormLabel>{label}</FormLabel>
      <InputField placeholder={`${label}`} type={inputType} {...register} />
      <FormErrorMessage>{fieldError?.message}</FormErrorMessage>
    </FormControl>
  )
}

export default CustomInput
