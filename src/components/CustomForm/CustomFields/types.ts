import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormTrigger
} from 'react-hook-form'
import { FormInput } from '../types'

export type CustomFieldsParams<T extends FieldValues, Option> = {
  current: {
    title: string
    content: FormInput<T, Option>[]
  }
  control: Control<T>
  errors: FieldErrors<T>
  trigger: UseFormTrigger<T>
  register: UseFormRegister<T>
}
