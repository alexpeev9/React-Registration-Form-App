import { Control, FieldValues, Path, UseFormTrigger } from 'react-hook-form'

export type CustomInputParams<T extends FieldValues> = {
  label: string
  name: Path<T>
  inputType: string
  control: Control<T>
  trigger: UseFormTrigger<T>
}
