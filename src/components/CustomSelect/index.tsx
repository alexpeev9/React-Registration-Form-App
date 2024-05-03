import {
  Control,
  FieldValues,
  Path,
  useController,
  UseFormTrigger
} from 'react-hook-form'
import { FormErrorMessage, FormLabel, FormControl } from '@chakra-ui/react'
import { GroupBase, OptionsOrGroups, Select } from 'chakra-react-select'

const CustomSelect = <T extends FieldValues, Option>({
  name,
  label,
  control,
  options,
  trigger
}: {
  name: Path<T>
  label: string
  control: Control<T>
  options: OptionsOrGroups<Option, GroupBase<Option>>
  trigger: UseFormTrigger<T>
}) => {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control
  })
  const validateSelect = async () => {
    field.onBlur()
    trigger([name])
  }

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
