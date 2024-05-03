import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as InputField
} from '@chakra-ui/react'
import { FieldError, UseFormRegister } from 'react-hook-form'
import { FormValues } from '../../utils/formSchema'

const CustomInput = ({
  fieldError,
  label,
  id,
  inputType,
  register
}: {
  fieldError: FieldError | undefined
  label: string
  id: keyof FormValues
  inputType: string
  register: UseFormRegister<FormValues>
}) => {
  return (
    <FormControl id={id} isInvalid={!!fieldError}>
      <FormLabel>{label}</FormLabel>
      <InputField
        border={'none'}
        boxShadow={'none'}
        placeholder={`${label}`}
        type={inputType}
        {...register(id)}
      />
      <FormErrorMessage>{fieldError?.message}</FormErrorMessage>
    </FormControl>
  )
}

export default CustomInput
