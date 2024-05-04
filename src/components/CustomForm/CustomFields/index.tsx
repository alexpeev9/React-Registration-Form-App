import { Fragment } from 'react'
import { FieldValues } from 'react-hook-form'
import CustomInput from '../../CustomInput'
import CustomSelect from '../../CustomSelect'
import CustomFileInput from '../../CustomFileInput'
import { CustomFieldsParams } from './types'

const CustomFields = <T extends FieldValues, Option>({
  current,
  control,
  errors,
  trigger,
  register
}: CustomFieldsParams<T, Option>) => {
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
