import { z } from 'zod'

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5mb
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
]

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
      .max(2, { message: 'Please pick maximum 2 interests' }),
    avatar: z
      .instanceof(FileList, { message: 'Please upload an image' })
      .refine(
        (files) => files[0]?.size <= MAX_FILE_SIZE,
        `Maximum file is up to 5mb`
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
        'Please upload a valid image'
      )
      .transform((files) => {
        return files.item(0)!
      })
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
  avatar: new File([], ''),
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
