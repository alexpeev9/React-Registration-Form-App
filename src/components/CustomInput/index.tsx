import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as InputField
} from '@chakra-ui/react'
import {
  Control,
  FieldValues,
  Path,
  useController,
  UseFormTrigger
} from 'react-hook-form'

const CustomInput = <T extends FieldValues>({
  label,
  name,
  inputType,
  control,
  trigger
}: {
  label: string
  name: Path<T>
  inputType: string
  control: Control<T>
  trigger: UseFormTrigger<T>
}) => {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control
  })

  const validateText = async () => {
    field.onBlur()
    trigger([name])
  }

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
