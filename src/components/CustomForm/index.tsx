import { FormEventHandler } from 'react'
import { FieldValues, Path, UseFormTrigger } from 'react-hook-form'
import { Container, Heading, Stack, useSteps } from '@chakra-ui/react'

import CustomStepper from './CustomStepper'
import CustomButtons from './CustomButtons'

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

  const goToPreviousStep = () => {
    goToPrevious()
  }

  return (
    <Container mt={8} mb={20} as='form' onSubmit={onSubmit}>
      <Heading as='h1' mb={8} size='lg'>
        {title}
      </Heading>
      <Stack spacing={6}>
        {/* Steps */}
        <CustomStepper steps={steps} activeStep={activeStep} />

        {/* Current Step */}
        {currentStep.content}

        {/* Next, Previous and Submit Buttons */}
        <CustomButtons
          activeStep={activeStep}
          stepsLength={steps.length}
          isSubmitting={isSubmitting}
          nextStep={goToNextStep}
          previousStep={goToPreviousStep}
        />
      </Stack>
    </Container>
  )
}

export default CustomForm
