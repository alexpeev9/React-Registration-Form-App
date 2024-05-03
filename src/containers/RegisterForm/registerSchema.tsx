import { z } from 'zod'
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '../../utils/constants'
import { interestsSchema } from './interestsSchema'

let password = ''

export const registerSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .refine((value) => {
      password = value
      return true
    }),
  passwordConfirmation: z
    .string()
    .min(6, { message: 'You must confirm your password' })
    .refine((value) => value === password, 'Password do not match'),
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

export type FormValues = z.infer<typeof registerSchema>

export const defaultValues: FormValues = {
  firstName: '',
  lastName: '',
  password: '',
  avatar: new File([], ''),
  passwordConfirmation: '',
  interests: []
}
