import { FieldValues, useController } from 'react-hook-form'
import { FormErrorMessage, FormLabel, FormControl } from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { CustomSelectParams } from './types'

const CustomSelect = <T extends FieldValues, Option>({
  name,
  label,
  control,
  options,
  trigger
}: CustomSelectParams<T, Option>) => {
  // Get field values and error status
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control
  })

  // Function to validate input and trigger form validation
  const validateSelect = async () => {
    field.onBlur()
    trigger([name])
  }

  // Customize field object to include custom event handler
  const customField = { ...field, onBlur: validateSelect }
  return (
    <FormControl id={name} isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Select
        isMulti={true}
        placeholder={label}
        options={options}
        {...customField}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}

export default CustomSelect
