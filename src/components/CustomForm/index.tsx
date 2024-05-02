import { useForm, SubmitHandler } from 'react-hook-form'
import {
  ButtonGroup,
  Container,
  Heading,
  Button,
  Stack
} from '@chakra-ui/react'
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

const CustomForm = () => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log(values)
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        resolve(values)
      }, 3000)
    })
  }

  const handleReset = () => {
    reset(defaultValues)
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

        {/* Reset and Submit Buttons */}
        <ButtonGroup>
          <Button
            type='button'
            isLoading={isSubmitting}
            onClick={handleReset}
            w='full'
          >
            Reset
          </Button>
          <Button
            type='submit'
            isLoading={isSubmitting}
            colorScheme='blue'
            w='full'
          >
            Submit
          </Button>
        </ButtonGroup>
      </Stack>
    </Container>
  )
}

export default CustomForm
