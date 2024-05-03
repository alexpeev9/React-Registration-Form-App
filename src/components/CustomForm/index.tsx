import { Container, Heading, Button, Stack } from '@chakra-ui/react'

import { ReactNode } from 'react'

const CustomForm = ({
  children,
  isSubmitting,
  onSubmit
}: {
  children: ReactNode
  isSubmitting: boolean
  onSubmit: React.FormEventHandler<HTMLDivElement>
}) => {
  return (
    <Container mt={8} mb={20} as='form' onSubmit={onSubmit}>
      {/* Title */}
      <Heading as='h1' mb={8} size='lg'>
        React Register Form
      </Heading>
      <Stack spacing={6}>
        {/* Input Elements */}
        {children}

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
