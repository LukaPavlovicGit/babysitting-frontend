'use client'

import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AccountCompletionData } from '@/schemas/accountCompletionSchema'
import { accountCompletionSchema } from '@/schemas/accountCompletionSchema'
import { UserTypeEnum } from '@/types/enums/UserTypeEnum'

import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { FormGroup, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { useAccountCompletion } from '@/contexts/AccountCompletionContext'

const steps = [
  'Choose Role',
  'Family Information',
  'What do you need from babysitter?',
]

export default function AccountCompletionStepper() {
  const {
    currentStep,
    nextStep,
    prevStep,
    canProceed,
    formData,
    updateFormData,
  } = useAccountCompletion()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountCompletionData>({
    resolver: zodResolver(accountCompletionSchema),
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <Box className="flex flex-col gap-32 w-2/3 h-2/3 px-32 py-16 fixed z-50 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-[#4B545C] rounded-lg">
      <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {}
          return (
            <Step
              key={label}
              {...stepProps}
              sx={{
                '& .MuiStepLabel-root .Mui-completed': {
                  color: 'black',
                },
                '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                  {
                    color: 'black',
                  },
                '& .MuiStepLabel-root .Mui-active': {
                  color: 'white',
                },
                '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                  {
                    color: 'white',
                  },
                '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                  fill: 'black',
                  fontWeight: 'bold',
                  fontSize: '24px',
                },
              }}
            >
              <StepLabel className="text-white">{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>

      {currentStep === 0 && <UserTypeStep />}
      {currentStep === 1 && <FamilyInformationStep />}
      {currentStep === 2 && <WhatDoYouNeedFromBabysitterStep />}

      <div className="flex justify-between pt-4">
        <Button onClick={prevStep} disabled={currentStep === 0}>
          Back
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button onClick={nextStep} disabled={!canProceed} variant="contained">
            Next
          </Button>
        ) : (
          <Button
            onClick={onSubmit}
            disabled={!canProceed}
            variant="contained"
            color="primary"
          >
            Complete
          </Button>
        )}
      </div>
    </Box>
  )
}

function UserTypeStep() {
  return (
    <div className="w-full h-full flex flex-col gap-12 justify-center items-center">
      <div className="text-white text-6xl font-medium">Who am I?</div>
      <RadioGroup name="userType">
        {Object.values(UserTypeEnum).map((userType) => (
          <FormControlLabel
            key={userType}
            value={userType}
            control={
              <Radio
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<CheckBoxIcon />}
              />
            }
            label={userType}
            className="text-white"
          />
        ))}
      </RadioGroup>
    </div>
  )
}

function FamilyInformationStep() {
  return <></>
}

function WhatDoYouNeedFromBabysitterStep() {
  return <></>
}
// export default function AccountCompletionStepper() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<AccountCompletionData>({
//     resolver: zodResolver(accountCompletionSchema),
//   })
//   const { mutate } = useGetAccountByEmail()

//   const onSubmit = handleSubmit((data) => {
//     console.log(data)
//   })

//   const [isLastStep, setIsLastStep] = React.useState(false)
//   const isAccountCompleted = useSelector(
//     (state: RootState) => state.auth.isAccountCompleted
//   )
//   const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

//   const [activeStep, setActiveStep] = React.useState(0)
//   const [skipped, setSkipped] = React.useState(new Set<number>())

//   const handleNext = () => {
//     const newSkipped = skipped

//     setActiveStep((prevActiveStep) => prevActiveStep + 1)
//     setSkipped(newSkipped)
//   }

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1)
//   }

//   const handleReset = () => {
//     setActiveStep(0)
//   }

//   return (
//     <Box className="flex flex-col gap-32 w-2/3 h-2/3 px-32 py-16 fixed z-50 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-[#4B545C] rounded-lg">
//       <Stepper activeStep={activeStep} alternativeLabel>
//         {parentSteps.map((label, index) => {
//           const stepProps: { completed?: boolean } = {}
//           return (
//             <Step
//               key={label}
//               {...stepProps}
//               sx={{
//                 '& .MuiStepLabel-root .Mui-completed': {
//                   color: 'black',
//                 },
//                 '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
//                   {
//                     color: 'black',
//                   },
//                 '& .MuiStepLabel-root .Mui-active': {
//                   color: 'white',
//                 },
//                 '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
//                   {
//                     color: 'white',
//                   },
//                 '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
//                   fill: 'black',
//                   fontWeight: 'bold',
//                   fontSize: '24px',
//                 },
//               }}
//             >
//               <StepLabel className="text-white">{label}</StepLabel>
//             </Step>
//           )
//         })}
//       </Stepper>
//       {activeStep === parentSteps.length ? (
//         <>
//           <Typography sx={{ mt: 2, mb: 1 }}>
//             All steps completed - you&apos;re finished
//           </Typography>
//           <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//             <Box sx={{ flex: '1 1 auto' }} />
//             <Button onClick={handleReset}>Reset</Button>
//           </Box>
//         </>
//       ) : (
//         <>
//           {activeStep === 0 && (
//             <div className="w-full h-full flex flex-col gap-12 justify-center items-center">
//               <div className="text-white text-6xl font-medium">Who am I?</div>
//               <RadioGroup name="userType">
//                 {Object.values(UserTypeEnum).map((userType) => (
//                   <FormControlLabel
//                     key={userType}
//                     value={userType}
//                     control={
//                       <Radio
//                         icon={<CheckBoxOutlineBlankIcon />}
//                         checkedIcon={<CheckBoxIcon />}
//                       />
//                     }
//                     label={userType}
//                     className="text-white"
//                   />
//                 ))}
//               </RadioGroup>
//             </div>
//           )}
//           {activeStep === 1 && (
//             <div className="w-full h-full flex justify-center items-center"></div>
//           )}
//           {activeStep === 2 && <></>}

//           <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//             <Button
//               color="inherit"
//               disabled={activeStep === 0}
//               onClick={handleBack}
//               sx={{ mr: 1 }}
//             >
//               Back
//             </Button>
//             <Box sx={{ flex: '1 1 auto' }} />
//             <Button onClick={handleNext}>
//               {activeStep === parentSteps.length - 1 ? 'Finish' : 'Next'}
//             </Button>
//           </Box>
//         </>
//       )}
//     </Box>
//   )
// }
