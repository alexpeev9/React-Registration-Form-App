export type CustomButtonsParams = {
  activeStep: number
  isSubmitting: boolean
  stepsLength: number
  nextStep: () => Promise<void>
  previousStep: () => void
}
