import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import CustomForm from './components/CustomForm'
import {
  defaultValues,
  registerSchema,
  Interests,
  FormValues,
  interestOptions
} from './utils/registerSchema'
import CustomInput from './components/CustomInput'
import CustomSelect from './components/CustomSelect'
import CustomFileInput from './components/CustomFileInput'

const App = () => {
  const {
    control,
    handleSubmit,
    trigger,
    register,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues
  })

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log(values)
    return new Promise((resolve) => {
      setTimeout(() => {
        alert('Great Success!')
        resolve(values)
      }, 3000)
    })
  }

  const steps = [
    {
      title: 'Information',
      content: (
        <>
          {/* First Name */}
          <CustomInput<FormValues>
            fieldError={errors.firstName}
            label='First Name'
            id='firstName'
            inputType='text'
            register={register}
          />
          {/* Last Name */}
          <CustomInput<FormValues>
            fieldError={errors.lastName}
            label='Last Name'
            id='lastName'
            inputType='text'
            register={register}
          />
          {/* Password */}
          <CustomInput<FormValues>
            fieldError={errors.password}
            label='Password'
            id='password'
            inputType='password'
            register={register}
          />
          {/* Confirm Password */}
          <CustomInput<FormValues>
            fieldError={errors.passwordConfirmation}
            label='Confirm Password'
            id='passwordConfirmation'
            inputType='password'
            register={register}
          />
          {/* Interests */}
          <CustomSelect<FormValues, Interests, true>
            isMulti
            name='interests'
            control={control}
            label='Interests (maximum 2)'
            placeholder='Select some interests'
            options={interestOptions}
            useBasicStyles
          />
        </>
      ),
      buttonNextFunction: () => {
        return trigger([
          'firstName',
          'lastName',
          'password',
          'passwordConfirmation',
          'interests'
        ])
      }
    },
    {
      title: 'Avatar',
      content: (
        <>
          {/* Avatar */}
          <CustomFileInput<FormValues>
            fieldError={errors.avatar}
            label='Avatar'
            id='avatar'
            inputType='file'
            register={register}
          />
        </>
      )
    }
  ]
  return (
    <CustomForm
      title='React Register Form'
      onSubmit={handleSubmit(onSubmit)}
      steps={steps}
      isSubmitting={isSubmitting}
    />
  )
}

export default App
