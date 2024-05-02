import { z } from 'zod'

const interestsSchema = z.object({
  label: z.string(),
  value: z.string()
})

export const formSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    passwordConfirmation: z
      .string()
      .min(1, { message: 'You must confirm your password' }),
    interests: interestsSchema
      .array()
      .min(1, { message: 'Please pick an interest' })
      .max(2, { message: 'Please pick maximum 2 interests' })
  })
  .refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    {
      message: 'Passwords must match',
      path: ['passwordConfirmation']
    }
  )

export type FormValues = z.infer<typeof formSchema>

export const defaultValues: FormValues = {
  firstName: '',
  lastName: '',
  password: '',
  passwordConfirmation: '',
  interests: []
}

export type Interests = z.infer<typeof interestsSchema>

export const interestOptions: Interests[] = [
  { label: 'Sports', value: 'sports' },
  { label: 'Music', value: 'music' },
  { label: 'Dancing', value: 'dancing' },
  { label: 'Games', value: 'games' }
]
