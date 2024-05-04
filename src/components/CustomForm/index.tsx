import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import { Container, Heading, Stack, useSteps } from '@chakra-ui/react'

import CustomStepper from './CustomStepper'
import CustomButtons from './CustomButtons'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodType } from 'zod'
import { GroupBase, OptionsOrGroups } from 'chakra-react-select'
import CustomFields from './CustomFields'

const CustomForm = <T extends FieldValues, SchemaType extends ZodType, Option>({
  onSubmit,
  title,
  formData,
  schema,
  defaultValues
}: {
  title: string
  onSubmit: SubmitHandler<T>
  formData: {
    title: string
    steps: {
      title: string
      content: {
        name: Path<T>
        label: string
        inputType: string
        options?: OptionsOrGroups<Option, GroupBase<Option>>
      }[]
    }[]
  }
  schema: SchemaType
  defaultValues: DefaultValues<T>
}) => {
  const { activeStep, goToPrevious, goToNext } = useSteps({
    count: formData.steps.length
  })

  const currentStep = formData.steps[activeStep]

  const goToNextStep = async () => {
    const names = currentStep.content.map((obj) => obj.name)
    const isValid = await trigger(names)
    if (!isValid) {
      return
    }
    goToNext()
  }

  const goToPreviousStep = () => {
    goToPrevious()
  }

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
