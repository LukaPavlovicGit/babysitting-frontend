'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ParentAccountCompletionData } from '@/schemas/parentAccountCompletionSchema'
import { parentAccountCompletionSchema } from '@/schemas/parentAccountCompletionSchema'
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
import { useAccountCompletionContext } from '@/contexts/AccountCompletionContext'
import { AgeCategoryEnum } from '@/types/enums/AgeCategoryEnum'
import { CharacteristicsEnum } from '@/types/enums/CharacteristicsEnum'
import { CurrencyEnum } from '@/types/enums/CurrencyEnum'
import { JobLocationEnum } from '@/types/enums/JobLocationEnum'
import { SkillsEnum } from '@/types/enums/SkillsEnum'

export default function AccountCompletionStepper() {
  const { currentStep } = useAccountCompletionContext()

  return (
    <Box className="flex flex-col flex-grow w-full gap-12 justify-between items-center bg-[#4B545C] rounded-lg p-5">
      {currentStep === -1 ? (
        <UserTypeStep />
      ) : (
        <>
          <AccountCompletionStepperHeader />
          <AccountCompletionStepperContent />
        </>
      )}
      <AccountCompletionStepperFooter />
    </Box>
  )
}

function AccountCompletionStepperHeader() {
  const { currentStep, getSteps } = useAccountCompletionContext()

  return (
    <Stepper activeStep={currentStep} alternativeLabel>
      {getSteps().map((label, index) => {
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
  )
}

function AccountCompletionStepperContent() {
  const { currentStep, isParent, isBabysitter } = useAccountCompletionContext()

  return (
    <>
      {isParent() && currentStep === 0 && <FamilyInformationStep />}
      {isParent() && currentStep === 1 && <WhatDoYouNeedFromBabysitterStep />}
      {isBabysitter() && currentStep === 0 && <BabySitterPersonalInformationStep />}
      {isBabysitter() && currentStep === 1 && <BabySitterExperienceAndAvailabilityStep />}
    </>
  )
}

function AccountCompletionStepperFooter() {
  const { currentStep, nextStep, prevStep, canProceed, getSteps } = useAccountCompletionContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ParentAccountCompletionData>({
    resolver: zodResolver(parentAccountCompletionSchema),
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className="flex w-full justify-between pt-4">
      <Button onClick={prevStep} disabled={currentStep === -1} variant="contained" color="info">
        Back
      </Button>

      {currentStep === -1 || currentStep < getSteps().length - 1 ? (
        <Button onClick={nextStep} disabled={!canProceed} variant="contained" color="info">
          Next
        </Button>
      ) : (
        <Button onClick={onSubmit} disabled={!canProceed} variant="contained" color="success">
          Complete
        </Button>
      )}
    </div>
  )
}

function UserTypeStep() {
  const { setUserType } = useAccountCompletionContext()

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
                  const value = e.target.value as UserTypeEnum
                  setUserType(value)
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

function BabySitterPersonalInformationStep() {
  const { updateBabysitterFormData, babysitterFormData } = useAccountCompletionContext()

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-24">
        <div className="flex flex-col space-y-4 max-w-md">
          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-white font-semibold">First name</span>
            <TextField onChange={(e) => updateBabysitterFormData({ firstName: e.target.value })} />
          </div>

          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-white font-semibold">Postal code</span>
            <TextField onChange={(e) => updateBabysitterFormData({ postalCode: Number(e.target.value) })} />
          </div>

          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-white font-semibold">Address name</span>
            <TextField onChange={(e) => updateBabysitterFormData({ addressName: e.target.value })} />
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
                  updateBabysitterFormData({ addressLatitude: value })
                }
              }}
              onBlur={(e) => {
                const value = parseFloat(e.target.value)
                if (value < -90) updateBabysitterFormData({ addressLatitude: -90 })
                if (value > 90) updateBabysitterFormData({ addressLatitude: 90 })
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
                  updateBabysitterFormData({ addressLongitude: value })
                }
              }}
              onBlur={(e) => {
                const value = parseFloat(e.target.value)
                if (value < -180) updateBabysitterFormData({ addressLongitude: -180 })
                if (value > 180) updateBabysitterFormData({ addressLongitude: 180 })
              }}
              placeholder="Enter longitude (-180 to 180)"
            />
          </div>
        </div>
        <div className="flex flex-col gap-16 justify-start">
          <div className="grid grid-cols-[140px_1fr] items-start gap-4">
            <span className="text-white font-semibold pt-1">Speaking languages:</span>
            <div>
              <RadioGroup name="speakingLanguages">
                <div className="grid grid-cols-3">
                  {Object.values(LanguagesEnum).map((language) => (
                    <FormControlLabel
                      key={language}
                      value={language}
                      control={
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon />}
                          checkedIcon={<CheckBoxIcon />}
                          checked={babysitterFormData.speakingLanguages?.includes(language) || false}
                          onChange={(e) => {
                            const currentLanguages = babysitterFormData.speakingLanguages || []
                            const value = e.target.value as LanguagesEnum
                            updateBabysitterFormData({
                              speakingLanguages: currentLanguages.includes(value)
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
          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-white font-semibold">Skills:</span>
            <div>
              <RadioGroup name="skills">
                <div className="grid grid-rows-2">
                  {Object.values(SkillsEnum).map((skill) => (
                    <FormControlLabel
                      key={skill}
                      value={skill}
                      control={
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon />}
                          checkedIcon={<CheckBoxIcon />}
                          checked={babysitterFormData.skills?.includes(skill) || false}
                          onChange={(e) => {
                            const currentSkills = babysitterFormData.skills || []
                            const value = e.target.value as SkillsEnum

                            updateBabysitterFormData({
                              skills: currentSkills.includes(value)
                                ? currentSkills.filter((char) => char !== value)
                                : [...currentSkills, value],
                            })
                          }}
                        />
                      }
                      label={skill}
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

function BabySitterExperienceAndAvailabilityStep() {
  const { updateBabysitterFormData, babysitterFormData } = useAccountCompletionContext()
  const timeSlots = ['Morning', 'Afternoon', 'Evening', 'Night']
  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
  const daysFull = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-24">
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
                          checked={babysitterFormData.currency === currency}
                          onChange={(e) => {
                            updateBabysitterFormData({
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
              onChange={(e) => updateBabysitterFormData({ rate: Number(e.target.value) })}
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
                          checked={babysitterFormData.jobLocation === jobLocation}
                          onChange={(e) => {
                            updateBabysitterFormData({
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
                            babysitterFormData.schedule?.[
                              `${day}${timeSlot}`.toLowerCase() as keyof typeof babysitterFormData.schedule
                            ] || false
                          }
                          onChange={(e) => {
                            const key = `${day}${timeSlot}`.toLowerCase() as keyof typeof babysitterFormData.schedule
                            updateBabysitterFormData({
                              schedule: {
                                ...babysitterFormData.schedule,
                                [key]: e.target.checked,
                              } as typeof babysitterFormData.schedule,
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

function FamilyInformationStep() {
  const { updateParentFormData, parentFormData } = useAccountCompletionContext()

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-24">
        <div className="flex flex-col space-y-4 max-w-md">
          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-white font-semibold">First name</span>
            <TextField onChange={(e) => updateParentFormData({ firstName: e.target.value })} />
          </div>

          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-white font-semibold">Postal code</span>
            <TextField onChange={(e) => updateParentFormData({ postalCode: Number(e.target.value) })} />
          </div>

          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-white font-semibold">Address name</span>
            <TextField onChange={(e) => updateParentFormData({ addressName: e.target.value })} />
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
                  updateParentFormData({ addressLatitude: value })
                }
              }}
              onBlur={(e) => {
                const value = parseFloat(e.target.value)
                if (value < -90) updateParentFormData({ addressLatitude: -90 })
                if (value > 90) updateParentFormData({ addressLatitude: 90 })
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
                  updateParentFormData({ addressLongitude: value })
                }
              }}
              onBlur={(e) => {
                const value = parseFloat(e.target.value)
                if (value < -180) updateParentFormData({ addressLongitude: -180 })
                if (value > 180) updateParentFormData({ addressLongitude: 180 })
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
                  updateParentFormData({ numberOfChildren: value })
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
                          checked={parentFormData.familySpeakingLanguages?.includes(language) || false}
                          onChange={(e) => {
                            const currentLanguages = parentFormData.familySpeakingLanguages || []
                            const value = e.target.value as LanguagesEnum
                            updateParentFormData({
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
                          checked={parentFormData.childrenAgeCategories?.includes(ageCategory) || false}
                          onChange={(e) => {
                            const currentAgeCategories = parentFormData.childrenAgeCategories || []
                            const value = e.target.value as AgeCategoryEnum
                            updateParentFormData({
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
                          checked={parentFormData.childrenCharacteristics?.includes(characteristic) || false}
                          onChange={(e) => {
                            const currentCharacteristics = parentFormData.childrenCharacteristics || []
                            const value = e.target.value as CharacteristicsEnum

                            updateParentFormData({
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
              onChange={(e) => updateParentFormData({ familyDescription: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function WhatDoYouNeedFromBabysitterStep() {
  const { updateParentFormData, parentFormData } = useAccountCompletionContext()

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
                          checked={parentFormData.currency === currency}
                          onChange={(e) => {
                            updateParentFormData({
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
              onChange={(e) => updateParentFormData({ rate: Number(e.target.value) })}
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
                          checked={parentFormData.jobLocation === jobLocation}
                          onChange={(e) => {
                            updateParentFormData({
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
        <div className="flex flex-col space-y-4 max-w-md">
          <div className="grid grid-cols-[140px_1fr] items-center gap-4">
            <span className="text-white font-semibold">What are the specific skills you need from babysitter?</span>
            <div>
              <RadioGroup name="skills">
                <div className="grid grid-rows-2">
                  {Object.values(SkillsEnum).map((skill) => (
                    <FormControlLabel
                      key={skill}
                      value={skill}
                      control={
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon />}
                          checkedIcon={<CheckBoxIcon />}
                          checked={parentFormData.preferebleSkills?.includes(skill) || false}
                          onChange={(e) => {
                            const currentSkills = parentFormData.preferebleSkills || []
                            const value = e.target.value as SkillsEnum

                            updateParentFormData({
                              preferebleSkills: currentSkills.includes(value)
                                ? currentSkills.filter((char) => char !== value)
                                : [...currentSkills, value],
                            })
                          }}
                        />
                      }
                      label={skill}
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
                            parentFormData.schedule?.[
                              `${day}${timeSlot}`.toLowerCase() as keyof typeof parentFormData.schedule
                            ] || false
                          }
                          onChange={(e) => {
                            const key = `${day}${timeSlot}`.toLowerCase() as keyof typeof parentFormData.schedule
                            updateParentFormData({
                              schedule: {
                                ...parentFormData.schedule,
                                [key]: e.target.checked,
                              } as typeof parentFormData.schedule,
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
