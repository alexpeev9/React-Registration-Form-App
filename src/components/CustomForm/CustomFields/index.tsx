import { Fragment } from 'react'
import { FieldValues } from 'react-hook-form'
import CustomInput from './CustomInput'
import CustomSelect from './CustomSelect'
import CustomFileInput from './CustomFileInput'
import { CustomFieldsParams } from './types'

const CustomFields = <T extends FieldValues, Option>({
  current,
  control,
  errors,
  trigger,
  register
}: CustomFieldsParams<T, Option>) => {
  return current.content.map((field, key) => {
    const { inputType, label, name, options } = field
    switch (inputType) {
      case 'text':
      case 'password':
        return (
          <Fragment key={key}>
            <CustomInput<T>
              label={label}
              name={name}
              inputType={inputType}
              control={control}
              trigger={trigger}
            />
          </Fragment>
        )
      case 'select':
        return (
          <Fragment key={key}>
            {options && (
              <CustomSelect<T, Option>
                name={name}
                control={control}
                label={label}
                options={options}
                trigger={trigger}
              />
            )}
          </Fragment>
        )
      case 'file':
        return (
          <Fragment key={key}>
            <CustomFileInput<T>
              label={label}
              name={name}
              fieldError={errors[name]}
              register={register}
            />
          </Fragment>
        )
      default:
        return null
    }
  })
}

export default CustomFields
