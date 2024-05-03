import { z } from 'zod'

export const interestsSchema = z.object({
  label: z.string(),
  value: z.string()
})

export type Interests = z.infer<typeof interestsSchema>

export const interestOptions: Interests[] = [
  { label: 'Sports', value: 'sports' },
  { label: 'Music', value: 'music' },
  { label: 'Dancing', value: 'dancing' },
  { label: 'Games', value: 'games' }
]
