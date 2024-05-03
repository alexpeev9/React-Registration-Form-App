import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps
} from '@chakra-ui/react'
import { FormEventHandler } from 'react'
import { FieldValues, Path, UseFormTrigger } from 'react-hook-form'

const CustomForm = <T extends FieldValues>({
  onSubmit,
  title,
  isSubmitting,
  steps,
  trigger
}: {
  title: string
  onSubmit: FormEventHandler<HTMLDivElement>
  trigger: UseFormTrigger<T>
  isSubmitting: boolean
  steps: {
    title: string
    content: JSX.Element
    inputs: Path<T>[]
  }[]
}) => {
  const { activeStep, goToPrevious, goToNext } = useSteps({
    count: steps.length
  })
  const currentStep = steps[activeStep]
  const goToNextStep = async () => {
    const isValid = await trigger(currentStep.inputs)
    if (!isValid) {
      return
    }
    goToNext()
  }

  return (
    <Container mt={8} mb={20} as='form' onSubmit={onSubmit}>
      <Heading as='h1' mb={8} size='lg'>
        {title}
      </Heading>
      <Stack spacing={6}>
        <Stepper index={activeStep}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink='0'>
                <StepTitle>{step.title}</StepTitle>
              </Box>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        {currentStep.content}
        {/* Previous and Submit Button */}
        <ButtonGroup>
          {/* Show Previous button only if there is a previous step */}
          {activeStep !== 0 && (
            <Button
              type='button'
              colorScheme='blue'
              onClick={() => goToPrevious()}
              w='50%'
              alignSelf={'center'}
            >
              Previous
            </Button>
          )}
          {/* Show Next button only if there is a next step */}
          {activeStep !== steps.length - 1 && (
            <Button
              type='button'
              colorScheme='blue'
              onClick={goToNextStep}
              w='50%'
              alignSelf={'center'}
            >
              Next
            </Button>
          )}
          {/* Submit button only on final step */}
          {activeStep === steps.length - 1 && (
            <Button
              type='submit'
              isLoading={isSubmitting}
              colorScheme='blue'
              w='50%'
              alignSelf={'center'}
            >
              Submit
            </Button>
          )}
        </ButtonGroup>
      </Stack>
    </Container>
  )
}

export default CustomForm
