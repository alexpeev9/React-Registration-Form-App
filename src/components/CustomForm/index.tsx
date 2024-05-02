import { useForm, SubmitHandler } from 'react-hook-form'
import { Container, Heading, Button, Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'

import CustomSelect from '../CustomSelect'
import CustomInput from '../CustomInput'
import {
  FormValues,
  Interests,
  defaultValues,
  formSchema,
  interestOptions
} from '../../utils/formSchema'
import CustomFileInput from '../CustomFileInput'

const CustomForm = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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

  return (
    <Container mt={8} mb={20} as='form' onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
      <Heading as='h1' mb={8} size='lg'>
        React Register Form
      </Heading>

      <Stack spacing={6}>
        {/* First Name */}
        <CustomInput
          fieldError={errors.firstName}
          label='First Name'
          id='firstName'
          inputType='text'
          register={register('firstName')}
        />

        {/* Last Name */}
        <CustomInput
          fieldError={errors.lastName}
          label='Last Name'
          id='lastName'
          inputType='text'
          register={register('lastName')}
        />

        {/* Password */}
        <CustomInput
          fieldError={errors.password}
          label='Password'
          id='password'
          inputType='password'
          register={register('password')}
        />

        {/* Confirm Password */}
        <CustomInput
          fieldError={errors.passwordConfirmation}
          label='Confirm Password'
          id='passwordConfirmation'
          inputType='password'
          register={register('passwordConfirmation')}
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

        {/* Avatar */}
        <CustomFileInput
          fieldError={errors.avatar}
          label='Avatar'
          id='avatar'
          inputType='file'
          register={register('avatar')}
        />

        {/* Submit Button */}
        <Button
          type='submit'
          isLoading={isSubmitting}
          colorScheme='blue'
          w='50%'
          alignSelf={'center'}
        >
          Submit
        </Button>
      </Stack>
    </Container>
  )
}

export default CustomForm
