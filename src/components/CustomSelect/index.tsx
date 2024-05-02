import { useController, FieldValues, UseControllerProps } from 'react-hook-form'
import { FormErrorMessage, FormLabel, FormControl } from '@chakra-ui/react'
import { Select, Props as SelectProps, GroupBase } from 'chakra-react-select'

interface CustomSelectProps<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Omit<SelectProps<Option, IsMulti, Group>, 'name' | 'defaultValue'>,
    UseControllerProps<FormValues> {
  label?: string
}

const CustomSelect = <
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  name,
  label,
  options,
  control,
  ...selectProps
}: CustomSelectProps<FormValues, Option, IsMulti, Group>) => {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control
  })

  return (
    <FormControl id={name} isInvalid={!!error}>
      {label && <FormLabel>{label}</FormLabel>}
      <Select options={options} {...selectProps} {...field} />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}

export default CustomSelect
