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
import { CurrencyEnum } from '@/types/enums/CurrencyEnum'
import { JobLocationEnum } from '@/types/enums/JobLocationEnum'

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
    <Box className="flex flex-col flex-grow w-full gap-12 justify-between items-center bg-[#4B545C] rounded-lg p-5">
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

      <div className="flex w-full justify-between pt-4">
        <Button onClick={prevStep} disabled={currentStep === 0} variant="contained" color="info">
          Back
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button onClick={nextStep} disabled={!canProceed} variant="contained" color="info">
            Next
          </Button>
        ) : (
          <Button onClick={onSubmit} disabled={!canProceed} variant="contained" color="success">
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
    <div className="size-full flex flex-col gap-8 justify-center items-center">
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
    <div className="flex flex-col">
      <div className="flex flex-col gap-24">
        <div className="flex flex-col space-y-4 max-w-md">
          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-white font-semibold">First name</span>
            <TextField onChange={(e) => updateFormData({ firstName: e.target.value })} />
          </div>

          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-white font-semibold">Postal code</span>
            <TextField onChange={(e) => updateFormData({ postalCode: Number(e.target.value) })} />
          </div>

          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-white font-semibold">Address name</span>
            <TextField onChange={(e) => updateFormData({ addressName: e.target.value })} />
          </div>

          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-white font-semibold">Address latitude</span>
            <TextField
              type="number"
              sx={{
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
                '& input[type=number]': {
                  MozAppearance: 'textfield',
                },
              }}
              inputProps={{
                min: -90,
                max: 90,
                step: 'any',
              }}
              onChange={(e) => {
                const value = parseFloat(e.target.value)
                if (value >= -90 && value <= 90) {
                  updateFormData({ addressLatitude: value })
                }
              }}
              onBlur={(e) => {
                const value = parseFloat(e.target.value)
                if (value < -90) updateFormData({ addressLatitude: -90 })
                if (value > 90) updateFormData({ addressLatitude: 90 })
              }}
              placeholder="Enter latitude (-90 to 90)"
            />
          </div>

          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-white font-semibold">Address longitude</span>
            <TextField
              type="number"
              sx={{
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
                '& input[type=number]': {
                  MozAppearance: 'textfield',
                },
              }}
              inputProps={{
                min: -180,
                max: 180,
                step: 'any',
              }}
              onChange={(e) => {
                const value = parseFloat(e.target.value)
                if (value >= -180 && value <= 180) {
                  updateFormData({ addressLongitude: value })
                }
              }}
              onBlur={(e) => {
                const value = parseFloat(e.target.value)
                if (value < -180) updateFormData({ addressLongitude: -180 })
                if (value > 180) updateFormData({ addressLongitude: 180 })
              }}
              placeholder="Enter longitude (-180 to 180)"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-4 max-w-md">
          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-white font-semibold">Number of children</span>
            <TextField
              type="number"
              inputProps={{
                min: 1,
                max: 10,
                step: 1,
              }}
              onChange={(e) => {
                const value = Number(e.target.value)
                if (value >= 1 && value <= 10) {
                  updateFormData({ numberOfChildren: value })
                }
              }}
            />
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
        <div className="flex flex-col space-y-4 w-full">
          <div className="grid grid-cols-[140px_1fr] items-start gap-4">
            <span className="text-white font-semibold mt-2">Tell us about your family:</span>
            <textarea
              className="w-full p-2 rounded bg-gray-700 text-white resize-none overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              rows={4}
              placeholder="Enter family description..."
              onChange={(e) => updateFormData({ familyDescription: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function WhatDoYouNeedFromBabysitterStep() {
  const { updateFormData, formData } = useAccountCompletion()

  const timeSlots = ['Morning', 'Afternoon', 'Evening', 'Night']
  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
  const daysFull = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-16 w-full">
        <div className="flex flex-col space-y-0 max-w-md w-full">
          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-white font-semibold">Currency</span>
            <div>
              <RadioGroup name="familySpeakingLanguages">
                <div className="grid grid-cols-3">
                  {Object.values(CurrencyEnum).map((currency) => (
                    <FormControlLabel
                      key={currency}
                      value={currency}
                      control={
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon />}
                          checkedIcon={<CheckBoxIcon />}
                          checked={formData.currency === currency}
                          onChange={(e) => {
                            updateFormData({
                              currency: e.target.value as CurrencyEnum,
                            })
                          }}
                        />
                      }
                      label={currency}
                      className="text-white"
                    />
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-white font-semibold">Rate</span>
            <TextField
              type="number"
              inputProps={{
                min: 0,
                step: 0.01,
              }}
              onChange={(e) => updateFormData({ rate: Number(e.target.value) })}
              sx={{
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0,
                },
                '& input[type=number]': {
                  MozAppearance: 'textfield',
                },
              }}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-4 max-w-md">
          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-white font-semibold">Job location</span>
            <div>
              <RadioGroup name="jobLocation">
                <div className="grid grid-rows-2">
                  {Object.values(JobLocationEnum).map((jobLocation) => (
                    <FormControlLabel
                      key={jobLocation}
                      value={jobLocation}
                      control={
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon />}
                          checkedIcon={<CheckBoxIcon />}
                          checked={formData.jobLocation === jobLocation}
                          onChange={(e) => {
                            updateFormData({
                              jobLocation: e.target.value as JobLocationEnum,
                            })
                          }}
                        />
                      }
                      label={jobLocation}
                      className="text-white"
                    />
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4 w-full">
          <div className="flex flex-col gap-4 w-full items-start">
            <span className="text-white font-semibold">When do you need babysitter?</span>
            <div className="w-full">
              {/* Grid Container */}
              <div className="grid grid-cols-8 gap-4">
                {/* Empty cell for top-left corner */}
                <div className=""></div>

                {/* Days header */}
                {days.map((day) => (
                  <div key={day} className="text-white text-center font-medium">
                    {day}
                  </div>
                ))}

                {/* Time slots and checkboxes */}
                {timeSlots.map((timeSlot, rowIndex) => (
                  <React.Fragment key={timeSlot}>
                    <div className="text-white text-left">{timeSlot}</div>

                    {daysFull.map((day, colIndex) => (
                      <div key={`${day}${timeSlot}`} className="flex justify-center items-center">
                        <Checkbox
                          checked={
                            formData.schedule?.[`${day}${timeSlot}`.toLowerCase() as keyof typeof formData.schedule] ||
                            false
                          }
                          onChange={(e) => {
                            const key = `${day}${timeSlot}`.toLowerCase() as keyof typeof formData.schedule
                            updateFormData({
                              schedule: {
                                ...formData.schedule,
                                [key]: e.target.checked,
                              } as typeof formData.schedule,
                            })
                          }}
                        />
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
