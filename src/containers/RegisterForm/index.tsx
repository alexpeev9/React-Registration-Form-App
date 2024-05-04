import { SubmitHandler } from 'react-hook-form'

import {
  registerSchema,
  RegisterValues,
  RegisterSchemaType,
  defaultValues
} from './registerSchema'
import { registerForm } from '../../utils/constants'
import CustomForm from '../../components/CustomForm'
import { interestOptions, Interests } from './interestsSchema'
import { FormData } from '../../components/CustomForm/types'

const RegisterForm = () => {
  // Define form data structure
  const formData: FormData<RegisterValues, Interests> = {
    title: registerForm.title,
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

  // Function to handle form submission
  const onSubmit: SubmitHandler<RegisterValues> = (values) => {
    console.log(values)
    return new Promise((resolve) => {
      // Simulate asynchronous submission
      setTimeout(() => {
        alert('Great Success!') // Display success message
        resolve(values) // Resolve promise with form values
      }, 3000)
    })
  }

  // Render custom form component with register form data
  return (
    <CustomForm<RegisterValues, RegisterSchemaType, Interests>
      // Pass title
      title={registerForm.title}
      // Pass submit handler
      onSubmit={onSubmit}
      // Pass form data
      formData={formData}
      // Pass form schema for validation
      schema={registerSchema}
      // Pass default values for form fields
      defaultValues={defaultValues}
    />
  )
}

export default RegisterForm
