import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as InputField
} from '@chakra-ui/react'
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form'

const CustomInput = <T extends FieldValues>({
  fieldError,
  label,
  id,
  inputType,
  register
}: {
  fieldError: FieldError | undefined
  label: string
  id: Path<T>
  inputType: string
  register: UseFormRegister<T>
}) => {
  return (
    <FormControl id={id} isInvalid={!!fieldError}>
      <FormLabel>{label}</FormLabel>
      <InputField placeholder={`${label}`} type={inputType} {...register(id)} />
      <FormErrorMessage>{fieldError?.message}</FormErrorMessage>
    </FormControl>
  )
}

export default CustomInput
