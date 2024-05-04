import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister
} from 'react-hook-form'

export type CustomFileInputParams<T extends FieldValues> = {
  fieldError: FieldErrors<T>[Path<T>] | undefined
  label: string
  name: Path<T>
  register: UseFormRegister<T>
}
