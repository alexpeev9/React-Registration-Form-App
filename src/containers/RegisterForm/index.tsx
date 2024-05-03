import { Path, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, FormValues, defaultValues } from './registerSchema'
import { interestOptions, Interests } from './interestsSchema'
import CustomInput from '../../components/CustomInput'
import CustomSelect from '../../components/CustomSelect'
import CustomFileInput from '../../components/CustomFileInput'
import CustomForm from '../../components/CustomForm'
import { registerForm } from '../../utils/constants'

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
            label='First Name'
            name='firstName'
            inputType='text'
            control={control}
            trigger={trigger}
          />
          {/* Last Name */}
          <CustomInput<FormValues>
            label='Last Name'
            name='lastName'
            inputType='text'
            control={control}
            trigger={trigger}
          />
          {/* Password */}
          <CustomInput<FormValues>
            label='Password'
            name='password'
            inputType='password'
            control={control}
            trigger={trigger}
          />
          {/* Confirm Password */}
          <CustomInput<FormValues>
            label='Confirm Password'
            name='passwordConfirmation'
            inputType='password'
            control={control}
            trigger={trigger}
          />
          {/* Interests */}
          <CustomSelect<FormValues, Interests>
            name='interests'
            control={control}
            label='Interests (maximum 2)'
            options={interestOptions}
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
            label='Avatar'
            name='avatar'
            inputType='file'
            fieldError={errors.avatar}
            register={register}
          />
        </>
      )
    }
  ]
  return (
    <CustomForm<FormValues>
      title={registerForm.title}
      onSubmit={handleSubmit(onSubmit)}
      trigger={trigger}
      steps={steps}
      isSubmitting={isSubmitting}
    />
  )
}

export default RegisterForm
