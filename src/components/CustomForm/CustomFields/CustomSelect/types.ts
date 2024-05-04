import { GroupBase, OptionsOrGroups } from 'chakra-react-select'
import { Control, FieldValues, Path, UseFormTrigger } from 'react-hook-form'

export type CustomSelectParams<T extends FieldValues, Option> = {
  name: Path<T>
  label: string
  control: Control<T>
  options: OptionsOrGroups<Option, GroupBase<Option>>
  trigger: UseFormTrigger<T>
}
