import { Path, SubmitHandler, useForm } from 'react-hook-form'
import { registerSchema, FormValues, defaultValues } from './registerSchema'
import { interestOptions, Interests } from './interestsSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import CustomInput from '../../components/CustomInput'
import CustomSelect from '../../components/CustomSelect'
import CustomFileInput from '../../components/CustomFileInput'
import CustomForm from '../../components/CustomForm'

const RegisterForm = () => {
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

  const steps: {
    title: string
    inputs: Path<FormValues>[]
    content: JSX.Element
  }[] = [
    {
      title: 'Information',
      inputs: [
        'firstName',
        'lastName',
        'password',
        'passwordConfirmation',
        'interests'
      ],
      content: (
        <>
          {/* First Name */}
          <CustomInput<FormValues>
            fieldError={errors.firstName}
            label='First Name'
            id='firstName'
            inputType='text'
            register={register}
            trigger={trigger}
          />
          {/* Last Name */}
          <CustomInput<FormValues>
            fieldError={errors.lastName}
            label='Last Name'
            id='lastName'
            inputType='text'
            register={register}
            trigger={trigger}
          />
          {/* Password */}
          <CustomInput<FormValues>
            fieldError={errors.password}
            label='Password'
            id='password'
            inputType='password'
            register={register}
            trigger={trigger}
          />
          {/* Confirm Password */}
          <CustomInput<FormValues>
            fieldError={errors.passwordConfirmation}
            label='Confirm Password'
            id='passwordConfirmation'
            inputType='password'
            register={register}
            trigger={trigger}
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
            trigger={trigger}
          />
        </>
      )
    },
    {
      title: 'Avatar',
      inputs: ['avatar'],
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
    <CustomForm<FormValues>
      title='React Register Form'
      onSubmit={handleSubmit(onSubmit)}
      trigger={trigger}
      steps={steps}
      isSubmitting={isSubmitting}
    />
  )
}

export default RegisterForm
