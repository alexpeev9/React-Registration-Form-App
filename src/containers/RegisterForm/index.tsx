import { Path, SubmitHandler } from 'react-hook-form'
import {
  registerSchema,
  RegisterValues,
  RegisterSchemaType,
  defaultValues
} from './registerSchema'
import { registerForm } from '../../utils/constants'
import CustomForm from '../../components/CustomForm'
import { interestOptions, Interests } from './interestsSchema'
import { GroupBase, OptionsOrGroups } from 'chakra-react-select'

const RegisterForm = () => {
  const onSubmit: SubmitHandler<RegisterValues> = (values) => {
    console.log(values)
    return new Promise((resolve) => {
      setTimeout(() => {
        alert('Great Success!')
        resolve(values)
      }, 3000)
    })
  }

  const formData: {
    title: string
    steps: {
      title: string
      content: {
        name: Path<RegisterValues>
        label: string
        inputType: string
        options?: OptionsOrGroups<Interests, GroupBase<Interests>>
      }[]
    }[]
  } = {
    title: 'Register',
    steps: [
      {
        title: 'Information',
        content: [
          { name: 'firstName', label: 'First Name', inputType: 'text' },
          { name: 'lastName', label: 'Last Name', inputType: 'text' },
          { name: 'password', label: 'Password', inputType: 'password' },
          {
            name: 'passwordConfirmation',
            label: 'Confirm Password',
            inputType: 'password'
          },
          {
            name: 'interests',
            label: 'Interests (maximum 2)',
            inputType: 'select',
            options: interestOptions
          }
        ]
      },
      {
        title: 'Avatar',
        content: [{ name: 'avatar', label: 'Avatar', inputType: 'file' }]
      }
    ]
  }
  return (
    <CustomForm<RegisterValues, RegisterSchemaType, Interests>
      title={registerForm.title}
      onSubmit={onSubmit}
      formData={formData}
      schema={registerSchema}
      defaultValues={defaultValues}
    />
  )
}

export default RegisterForm
