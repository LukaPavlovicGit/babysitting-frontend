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
    <Box className="flex flex-col flex-grow w-full gap-12 justify-center items-center bg-[#4B545C] rounded-lg p-5">
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
    <div className="size-full flex flex-col gap-8 justify-start items-center">
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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-16 justify-center items-center">
        <div className="flex flex-col space-y-4 max-w-md">
          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-white font-semibold">First name</span>
            <TextField />
          </div>

          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-white font-semibold">Postal code</span>
            <TextField />
          </div>

          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-white font-semibold">Address name</span>
            <TextField />
          </div>

          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-white font-semibold">Address latitude</span>
            <TextField />
          </div>

          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-white font-semibold">Address longitude</span>
            <TextField />
          </div>
        </div>
        <div className="flex flex-col gap-16 justify-start">
          <div className="grid grid-cols-[140px_1fr] items-start gap-4">
            <span className="text-white font-semibold pt-1">Family speaking languages:</span>
            <div>
              <RadioGroup name="familySpeakingLanguages">
                <div className="grid grid-cols-3">
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
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="grid grid-cols-[140px_1fr] items-start gap-4">
            <span className="text-white font-semibold pt-1">Choose children age categories:</span>
            <div>
              <RadioGroup name="childrenAgeCategories">
                <div className="grid grid-cols-3">
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
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="grid grid-cols-[140px_1fr] items-start gap-4">
            <span className="text-white font-semibold pt-1">Choose children characteristics:</span>
            <div>
              <RadioGroup name="familySpeakingLanguages">
                <div className="grid grid-cols-3">
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
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function WhatDoYouNeedFromBabysitterStep() {
  return (
    <div className="w-full h-full flex flex-col gap-12 justify-start items-center">
      <div className="text-white text-6xl font-medium">What do you need from babysitter?</div>
    </div>
  )
}
