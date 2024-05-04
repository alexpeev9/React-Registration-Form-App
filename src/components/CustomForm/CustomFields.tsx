import { GroupBase, OptionsOrGroups } from 'chakra-react-select'
import { Fragment } from 'react'
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormTrigger
} from 'react-hook-form'
import CustomInput from '../CustomInput'
import CustomSelect from '../CustomSelect'
import CustomFileInput from '../CustomFileInput'

const CustomFields = <T extends FieldValues, Option>({
  current,
  control,
  errors,
  trigger,
  register
}: {
  current: {
    title: string
    content: {
      name: Path<T>
      label: string
      inputType: string
      options?: OptionsOrGroups<Option, GroupBase<Option>>
    }[]
  }
  control: Control<T>
  errors: FieldErrors<T>
  trigger: UseFormTrigger<T>
  register: UseFormRegister<T>
}) => {
  return current.content.map((index, key) => (
    <Fragment key={key}>
      {(index.inputType === 'text' || index.inputType === 'password') && (
        <>
          <CustomInput<T>
            label={index.label}
            name={index.name}
            inputType={index.inputType}
            control={control}
            trigger={trigger}
          />
        </>
      )}

      {index.inputType === 'select' && index.options && (
        <>
          <CustomSelect<T, Option>
            name={index.name}
            control={control}
            label={index.label}
            options={index.options}
            trigger={trigger}
          />
        </>
      )}

      {index.inputType === 'file' && (
        <>
          <CustomFileInput<T>
            label={index.label}
            name={index.name}
            fieldError={errors[index.name]}
            register={register}
          />
        </>
      )}
    </Fragment>
  ))
}

export default CustomFields
