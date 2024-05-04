import { FieldValues, useForm } from 'react-hook-form'
import { Container, Heading, Stack, useSteps } from '@chakra-ui/react'
import { ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import CustomStepper from './CustomStepper'
import CustomButtons from './CustomButtons'
import CustomFields from './CustomFields'
import { FormTypes } from './types'

const CustomForm = <T extends FieldValues, SchemaType extends ZodType, Option>({
  onSubmit,
  title,
  formData,
  schema,
  defaultValues
}: FormTypes<T, SchemaType, Option>) => {
  // Custom hook to manage steps in the form
  const { activeStep, goToPrevious, goToNext } = useSteps({
    count: formData.steps.length
  })

  // Get current step from form data
  const currentStep = formData.steps[activeStep]

  // Function to navigate to the next step
  const goToNextStep = async () => {
    // Extract names of fields in the current step
    const names = currentStep.content.map((obj) => obj.name)

    // Trigger validation for fields in the current step
    const isValid = await trigger(names)

    if (!isValid) {
      return
    }

    // If validation passes, proceed to the next step
    goToNext()
  }

  // Function to navigate to the previous step
  const goToPreviousStep = () => {
    goToPrevious()
  }

  // Form control functions and state management
  const {
    control,
    handleSubmit,
    trigger,
    register,
    formState: { errors, isSubmitting }
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues
  })

  return (
    <Container mt={8} mb={20} as='form' onSubmit={handleSubmit(onSubmit)}>
      <Heading as='h1' mb={8} size='lg'>
        {title}
      </Heading>
      <Stack spacing={6}>
        {/* Steps */}
        <CustomStepper steps={formData.steps} activeStep={activeStep} />

        {/* Current Step Custom Fields */}
        <CustomFields
          current={currentStep}
          control={control}
          errors={errors}
          trigger={trigger}
          register={register}
        />

        {/* Next, Previous and Submit Buttons */}
        <CustomButtons
          activeStep={activeStep}
          stepsLength={formData.steps.length}
          isSubmitting={isSubmitting}
          nextStep={goToNextStep}
          previousStep={goToPreviousStep}
        />
      </Stack>
    </Container>
  )
}

export default CustomForm
