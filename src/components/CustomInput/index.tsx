import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as InputField
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormTrigger
} from 'react-hook-form'

const CustomInput = <T extends FieldValues>({
  fieldError,
  label,
  id,
  inputType,
  register,
  trigger
}: {
  fieldError: FieldError | undefined
  label: string
  id: Path<T>
  inputType: string
  register: UseFormRegister<T>
  trigger: UseFormTrigger<T>
}) => {
  const validateText = async (event: ChangeEvent<HTMLInputElement>) => {
    register(id).onChange(event)
    await trigger([id])
  }

  const customRegister = { ...register(id), onBlur: validateText }

  return (
    <FormControl id={id} isInvalid={!!fieldError}>
      <FormLabel>{label}</FormLabel>
      <InputField
        placeholder={`${label}`}
        type={inputType}
        {...customRegister}
      />
      <FormErrorMessage>{fieldError?.message}</FormErrorMessage>
    </FormControl>
  )
}

export default CustomInput
