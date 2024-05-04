import {
  Box,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle
} from '@chakra-ui/react'
import { CustomStepperParams } from './types'

const CustomStepper = ({ activeStep, steps }: CustomStepperParams) => {
  return (
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
  )
}

export default CustomStepper
