import { Button, ButtonGroup } from '@chakra-ui/react'
import { CustomButtonsParams } from './types'

const CustomButtons = ({
  activeStep,
  isSubmitting,
  stepsLength,
  nextStep,
  previousStep
}: CustomButtonsParams) => {
  return (
    <ButtonGroup display={'flex'} justifyContent={'center'}>
      {/* Show Previous button only if there is a previous step */}
      {activeStep !== 0 && (
        <Button
          type='button'
          colorScheme='blue'
          onClick={previousStep}
          w='50%'
          alignSelf={'center'}
        >
          Previous
        </Button>
      )}
      {/* Show Next button only if there is a next step */}
      {activeStep !== stepsLength - 1 && (
        <Button
          type='button'
          colorScheme='blue'
          onClick={nextStep}
          w='50%'
          alignSelf={'center'}
        >
          Next
        </Button>
      )}
      {/* Submit button only on final step */}
      {activeStep === stepsLength - 1 && (
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
  )
}

export default CustomButtons
