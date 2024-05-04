import { GroupBase, OptionsOrGroups } from 'chakra-react-select'
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler
} from 'react-hook-form'
import { ZodType } from 'zod'

export type FormInput<T, Option> = {
  name: Path<T>
  label: string
  inputType: string
  options?: OptionsOrGroups<Option, GroupBase<Option>>
}

export type FormData<T, Option> = {
  title: string
  steps: {
    title: string
    content: FormInput<T, Option>[]
  }[]
}

export type FormTypes<
  T extends FieldValues,
  SchemaType extends ZodType,
  Option
> = {
  title: string
  onSubmit: SubmitHandler<T>
  formData: FormData<T, Option>
  schema: SchemaType
  defaultValues: DefaultValues<T>
}
