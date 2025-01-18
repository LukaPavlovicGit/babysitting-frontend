'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AccountCompletionData } from '@/schemas/accountCompletionSchema'
import { accountCompletionSchema } from '@/schemas/accountCompletionSchema'
import { UserTypeEnum } from '@/types/enums/UserTypeEnum'
import { LanguagesEnum } from '@/types/enums/LanguagesEnum'

import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import { RadioGroup, FormControlLabel, Radio, TextField, Checkbox } from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { useAccountCompletion } from '@/contexts/AccountCompletionContext'
import { AgeCategoryEnum } from '@/types/enums/AgeCategoryEnum'
import { CharacteristicsEnum } from '@/types/enums/CharacteristicsEnum'

const steps = ['Choose Role', 'Family Information', 'What do you need from babysitter?']

export default function AccountCompletionStepper() {
  const { currentStep, nextStep, prevStep, canProceed, isParent } = useAccountCompletion()
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
    <Box className="flex flex-col flex-grow gap-8 w-2/3 min-h-2/3 px-8 py-4 fixed z-50 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-[#4B545C] rounded-lg">
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
                '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {
                  color: 'black',
                },
                '& .MuiStepLabel-root .Mui-active': {
                  color: 'white',
                },
                '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {
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
      {isParent() && currentStep === 1 && <FamilyInformationStep />}
      {isParent() && currentStep === 2 && <WhatDoYouNeedFromBabysitterStep />}

      <div className="flex justify-between pt-4">
        <Button onClick={prevStep} disabled={currentStep === 0}>
          Back
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button onClick={nextStep} disabled={!canProceed} variant="contained">
            Next
          </Button>
        ) : (
          <Button onClick={onSubmit} disabled={!canProceed} variant="contained" color="primary">
            Complete
          </Button>
        )}
      </div>
    </Box>
  )
}

function UserTypeStep() {
  const { updateFormData } = useAccountCompletion()

  return (
    <div className="w-full h-full flex flex-col gap-8 justify-start items-center">
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
                onChange={(e) => {
                  const name = e.target.name
                  const value = e.target.value as UserTypeEnum
                  updateFormData({ [name]: value })
                }}
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
  const { updateFormData, formData } = useAccountCompletion()

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <div className="text-white text-2xl">Tell us more about your family</div>
      <div className="flex gap-4 w-full">
        <div className="flex flex-col gap-4 w-fit">
          <TextField label="First name" />
          <div className="w-full flex flex-col gap-1">
            <TextField label="Postal code" />
            <TextField label="Address name" />
            <TextField label="Address latitude" />
            <TextField label="Address longitude" />
          </div>
        </div>
        <div className="flex flex-col gap-1 w-fit">
          <span className="text-white font-semibold">
            Family speaking
            <br /> languages:
          </span>
          <RadioGroup name="familySpeakingLanguages">
            {Object.values(LanguagesEnum).map((language) => (
              <FormControlLabel
                key={language}
                value={language}
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon />}
                    checkedIcon={<CheckBoxIcon />}
                    checked={formData.familySpeakingLanguages?.includes(language) || false}
                    onChange={(e) => {
                      const currentLanguages = formData.familySpeakingLanguages || []
                      const value = e.target.value as LanguagesEnum

                      updateFormData({
                        familySpeakingLanguages: currentLanguages.includes(value)
                          ? currentLanguages.filter((lang) => lang !== value)
                          : [...currentLanguages, value],
                      })
                    }}
                  />
                }
                label={language}
                className="text-white"
              />
            ))}
          </RadioGroup>
        </div>
        <div className="flex flex-col gap-1 w-fit">
          <span className="text-white font-semibold">
            Choose children
            <br /> age categories:
          </span>
          <RadioGroup name="childrenAgeCategories">
            {Object.values(AgeCategoryEnum).map((ageCategory) => (
              <FormControlLabel
                key={ageCategory}
                value={ageCategory}
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon />}
                    checkedIcon={<CheckBoxIcon />}
                    checked={formData.childrenAgeCategories?.includes(ageCategory) || false}
                    onChange={(e) => {
                      const currentAgeCategories = formData.childrenAgeCategories || []
                      const value = e.target.value as AgeCategoryEnum

                      updateFormData({
                        childrenAgeCategories: currentAgeCategories.includes(value)
                          ? currentAgeCategories.filter((age) => age !== value)
                          : [...currentAgeCategories, value],
                      })
                    }}
                  />
                }
                label={ageCategory}
                className="text-white"
              />
            ))}
          </RadioGroup>
        </div>
        <div className="flex flex-col gap-1 w-fit">
          <span className="text-white font-semibold">
            Choose children
            <br /> age categories:
          </span>
          <RadioGroup name="childrenCharacteristics">
            {Object.values(CharacteristicsEnum).map((characteristic) => (
              <FormControlLabel
                key={characteristic}
                value={characteristic}
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon />}
                    checkedIcon={<CheckBoxIcon />}
                    checked={formData.childrenCharacteristics?.includes(characteristic) || false}
                    onChange={(e) => {
                      const currentCharacteristics = formData.childrenCharacteristics || []
                      const value = e.target.value as CharacteristicsEnum

                      updateFormData({
                        childrenCharacteristics: currentCharacteristics.includes(value)
                          ? currentCharacteristics.filter((char) => char !== value)
                          : [...currentCharacteristics, value],
                      })
                    }}
                  />
                }
                label={characteristic}
                className="text-white"
              />
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}

function WhatDoYouNeedFromBabysitterStep() {
  return (
    <div className="w-full h-full flex flex-col gap-12 justify-center items-center">
      <div className="text-white text-6xl font-medium">What do you need from babysitter?</div>
    </div>
  )
}
